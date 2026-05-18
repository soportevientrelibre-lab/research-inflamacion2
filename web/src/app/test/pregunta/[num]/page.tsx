"use client";

import { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/lib/quiz-scoring";

export default function QuizQuestion() {
  const router = useRouter();
  const params = useParams();
  const questionNum = parseInt(params.num as string, 10);
  const questionIndex = questionNum - 1;
  const question = quizQuestions[questionIndex];

  // State for multi-select (q3)
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalQuestions = quizQuestions.length;
  const progress = (questionNum / totalQuestions) * 100;

  const handleAnswer = useCallback(
    (value: string) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      // Save answer to sessionStorage
      const answers = JSON.parse(
        sessionStorage.getItem("quiz-answers") || "{}"
      );
      answers[question.id] = value;
      sessionStorage.setItem("quiz-answers", JSON.stringify(answers));

      // Navigate
      setTimeout(() => {
        if (questionNum < totalQuestions) {
          router.push(`/test/pregunta/${questionNum + 1}`);
        } else {
          router.push("/test/email");
        }
      }, 400);
    },
    [isTransitioning, question.id, questionNum, totalQuestions, router]
  );

  const handleMultiSelect = useCallback(
    (value: string) => {
      setMultiSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    },
    []
  );

  const handleMultiSubmit = useCallback(() => {
    if (multiSelected.length === 0 || isTransitioning) return;
    setIsTransitioning(true);

    const answers = JSON.parse(
      sessionStorage.getItem("quiz-answers") || "{}"
    );
    answers[question.id] = multiSelected;
    sessionStorage.setItem("quiz-answers", JSON.stringify(answers));

    setTimeout(() => {
      if (questionNum < totalQuestions) {
        router.push(`/test/pregunta/${questionNum + 1}`);
      } else {
        router.push("/test/email");
      }
    }, 400);
  }, [multiSelected, isTransitioning, question.id, questionNum, totalQuestions, router]);

  if (!question) {
    router.push("/test");
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col bg-pattern">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                if (questionNum > 1) {
                  router.push(`/test/pregunta/${questionNum - 1}`);
                } else {
                  router.push("/test");
                }
              }}
              className="text-navy/40 hover:text-navy transition-colors"
              aria-label="Volver"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
            </button>
            <span className="text-xs text-muted font-medium">
              {questionNum} de {totalQuestions}
            </span>
          </div>
          <div className="h-1.5 bg-navy/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-bar-fill rounded-full"
              initial={{ width: `${((questionNum - 1) / totalQuestions) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg"
          >
            {/* Question Number */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center text-olive font-bold text-sm">
                {questionNum}
              </span>
              {question.subtitle && (
                <span className="text-muted text-sm">{question.subtitle}</span>
              )}
            </div>

            {/* Question Text */}
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy leading-snug mb-8">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => {
                    if (question.multiSelect) {
                      handleMultiSelect(option.value);
                    } else {
                      handleAnswer(option.value);
                    }
                  }}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 group
                    ${
                      question.multiSelect &&
                      multiSelected.includes(option.value)
                        ? "border-olive bg-olive/10 text-navy shadow-sm"
                        : "border-navy/8 bg-white/70 hover:border-olive/40 hover:bg-white hover:shadow-sm text-navy/80"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox for multi-select, Radio for single */}
                    {question.multiSelect ? (
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          multiSelected.includes(option.value)
                            ? "border-olive bg-olive"
                            : "border-navy/20 group-hover:border-olive/50"
                        }`}
                      >
                        {multiSelected.includes(option.value) && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17L4 12" />
                          </svg>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all border-navy/20 group-hover:border-olive/50`}
                      >
                        <div className="w-2 h-2 rounded-full bg-olive opacity-0 group-hover:opacity-30 transition-opacity" />
                      </div>
                    )}
                    <span className="font-medium text-sm md:text-base">
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Multi-select submit button */}
            {question.multiSelect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <button
                  onClick={handleMultiSubmit}
                  disabled={multiSelected.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                    multiSelected.length > 0
                      ? "bg-olive hover:bg-olive-dark hover:scale-[1.02] shadow-md"
                      : "bg-navy/15 cursor-not-allowed"
                  }`}
                >
                  {multiSelected.length > 0
                    ? `Continuar (${multiSelected.length} seleccionados) →`
                    : "Selecciona al menos uno"}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <div className="text-center pb-6">
        <p className="text-muted/50 text-xs">
          Tu información es 100% privada y confidencial
        </p>
      </div>
    </main>
  );
}
