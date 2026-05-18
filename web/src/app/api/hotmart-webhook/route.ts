export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inicializamos Supabase Admin para tener permisos de escribir en las tablas sin RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    // Hotmart Webhook configuration (hottok)
    const hotmartToken = process.env.HOTMART_WEBHOOK_TOKEN;
    const authHeader = req.headers.get("X-Hotmart-Hottok");

    // Verificar seguridad básica (si está configurado el token en nuestro .env)
    if (hotmartToken && authHeader !== hotmartToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json();

    // Eventos principales de Hotmart que nos interesan: 'PURCHASE_APPROVED' o 'PURCHASE_COMPLETE'
    const event = payload.event;

    if (event !== "PURCHASE_APPROVED" && event !== "PURCHASE_COMPLETE") {
      // Ignorar otros eventos (abandonos de carrito, reembolsos se podrían manejar aquí también)
      return NextResponse.json({ received: true, ignored: true });
    }

    const { data } = payload;
    const buyerEmail = data?.buyer?.email;
    const transactionId = data?.purchase?.transaction;
    const productId = data?.product?.id;
    const price = data?.purchase?.price?.value || 0;

    if (!buyerEmail || !transactionId) {
      return NextResponse.json({ error: "Datos de compra incompletos" }, { status: 400 });
    }

    // 1. Registrar la compra en la tabla `purchases`
    const { error: purchaseError } = await supabase
      .from("purchases")
      .upsert(
        {
          hotmart_transaction_id: transactionId,
          email: buyerEmail,
          product_id: productId?.toString() || "core",
          amount_cents: Math.round(price * 100), // Convertimos a céntimos
          status: "completed",
        },
        { onConflict: "hotmart_transaction_id" } // Si Hotmart envía reintentos, no duplicamos
      );

    if (purchaseError) {
      console.error("Error guardando purchase:", purchaseError);
    }

    // 2. Dar de alta a la usuaria en el Portal (`portal_users`)
    // Primero comprobamos si ya existe el usuario para no machacar su fecha de inicio
    const { data: existingUser } = await supabase
      .from("portal_users")
      .select("email")
      .eq("email", buyerEmail)
      .single();

    if (!existingUser) {
      // No existe, la añadimos. Idealmente, se crea el Auth user con admin api, 
      // pero como es Magic Link, con guardar el registro en la tabla pública vinculada a auth bastará,
      // o simplemente dejamos que el trigger de Supabase (si lo configuramos) cree el registro.
      // 
      // Como estamos usando magic link sin password, podemos crear el usuario auth aquí:
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: buyerEmail,
        email_confirm: true, // Ya sabemos que el email es válido porque pagó con él
      });

      if (!authError && authUser?.user) {
        // Insertamos en portal_users con el ID de Auth que acabamos de crear
        await supabase
          .from("portal_users")
          .insert({
            id: authUser.user.id,
            email: buyerEmail,
            first_purchase_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          });
      }
    }

    // 3. Opcional: Avisar a MailerLite que ya es clienta (mover de grupo)
    // ...

    return NextResponse.json({ success: true, transactionId });
  } catch (error) {
    console.error("Error procesando Webhook de Hotmart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
