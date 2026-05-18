import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inicializamos el cliente de Supabase usando el Service Role Key (para tener permisos de escritura en la BD)
// NOTA: Para producción, deberás agregar NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Fallback temporal si no existe la clave de servicio
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, perfil, scores } = body;

    if (!email || !perfil) {
      return NextResponse.json({ error: "Email y perfil son requeridos" }, { status: 400 });
    }

    // 1. Guardar en Supabase (Tabla leads)
    const { data: leadData, error: supabaseError } = await supabase
      .from("leads")
      .insert([
        {
          email,
          perfil,
          scores,
          source: "quiz",
        },
      ])
      .select()
      .single();

    if (supabaseError) {
      console.error("Error guardando lead en Supabase:", supabaseError);
      // No detenemos el flujo aquí porque lo más crítico es enviarlo a MailerLite
    }

    // 2. Enviar a MailerLite
    const mailerliteApiKey = process.env.MAILERLITE_API_KEY;
    
    if (mailerliteApiKey) {
      const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${mailerliteApiKey}`
        },
        body: JSON.stringify({
          email: email,
          fields: {
            // Guardamos el perfil en un custom field que luego debes crear en MailerLite (ej: 'perfil_inflamacion')
            // Por ahora lo metemos en 'company' o similar si no está creado, pero lo ideal es tener un field exacto.
            perfil_inflamacion: perfil
          },
          groups: [
            // Aquí puedes poner el ID del grupo (lista) al que quieres que entren. 
            // process.env.MAILERLITE_GROUP_ID
          ]
        })
      });

      if (!mlResponse.ok) {
        console.error("Error enviando a MailerLite:", await mlResponse.text());
      }
    } else {
      console.warn("MAILERLITE_API_KEY no está configurada. El lead solo se guardó en Supabase.");
    }

    return NextResponse.json({ success: true, lead: leadData });
  } catch (error) {
    console.error("Error en API de leads:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
