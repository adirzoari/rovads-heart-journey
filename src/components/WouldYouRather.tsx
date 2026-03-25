import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface WouldYouRatherProps {
  show: boolean;
  optionA: string;
  optionB: string;
  onPick: (choice: "a" | "b") => void;
  onSkip: () => void;
}

const dilemmas = [
  { a: "לחיות בעיר עם כל הנוחות", b: "לחיות ביישוב עם הרבה טבע" },
  { a: "לדעת את העתיד", b: "לשנות את העבר" },
  { a: "לנסוע לבד לחו״ל", b: "טיול משפחתי גדול בארץ" },
  { a: "להיות מפורסם ועשיר", b: "להיות אנונימי ושמח" },
  { a: "לקבל מתנה מפתיעה", b: "לבחור בעצמך את המתנה" },
  { a: "ארוחת שבת ענקית עם 30 אורחים", b: "שבת שקטה רק שניכם" },
  { a: "ללמוד כישרון חדש כל שבוע", b: "להשתלט על כישרון אחד לחלוטין" },
  { a: "לגור ליד ההורים", b: "לגור רחוק ולהיות עצמאיים" },
  { a: "חתונה ענקית עם כל העולם", b: "חתונה אינטימית ומיוחדת" },
  { a: "תמיד להגיד את האמת", b: "תמיד לדעת מתי משקרים לך" },
  { a: "לחיות 200 שנה אבל רגיל", b: "לחיות 80 שנה אבל מאושר לגמרי" },
  { a: "שיגידו עליך ״חכם״", b: "שיגידו עליך ״טוב לב״" },
];

export const getRandomDilemma = () => {
  return dilemmas[Math.floor(Math.random() * dilemmas.length)];
};

const WouldYouRather = ({ show, optionA, optionB, onPick, onSkip }: WouldYouRatherProps) => {
  const [picked, setPicked] = useState<"a" | "b" | null>(null);

  const handlePick = (choice: "a" | "b") => {
    setPicked(choice);
    setTimeout(() => {
      setPicked(null);
      onPick(choice);
    }, 800);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="rounded-3xl overflow-hidden card-shadow border border-white/75">
            {/* Header */}
            <div className="px-5 py-4 text-center" style={{ background: "rgba(200, 180, 248, 0.40)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
              <p className="text-foreground text-sm font-bold tracking-wider">
                🤔 מה הייתם מעדיפים?
              </p>
            </div>

            {/* Options */}
            <div className="card-gradient">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePick("a")}
                className={`w-full px-4 sm:px-6 py-5 sm:py-8 text-center border-b border-white/50 transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex items-center justify-between gap-3 ${
                  picked === "a"
                    ? "bg-accent/15"
                    : picked === "b"
                      ? "opacity-40"
                      : "hover:bg-white/50"
                }`}
              >
                <p className="text-base sm:text-lg font-bold text-foreground flex-1 text-right">{optionA}</p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 shrink-0">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </motion.button>

              <div className="flex items-center justify-center -my-4 relative z-10">
                <span className="bg-accent text-white text-xs font-extrabold w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white/80 action-shadow">
                  או
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePick("b")}
                className={`w-full px-4 sm:px-6 py-5 sm:py-8 text-center transition-all duration-300 min-h-[80px] sm:min-h-[100px] flex items-center justify-between gap-3 ${
                  picked === "b"
                    ? "bg-accent/15"
                    : picked === "a"
                      ? "opacity-40"
                      : "hover:bg-white/50"
                }`}
              >
                <p className="text-base sm:text-lg font-bold text-foreground flex-1 text-right">{optionB}</p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 shrink-0">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </div>

            {/* Skip */}
            <div className="px-5 py-3 text-center border-t border-white/50" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              <button
                onClick={onSkip}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                דלגו
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WouldYouRather;
