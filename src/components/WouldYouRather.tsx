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
          <div className="rounded-2xl overflow-hidden card-shadow border border-border">
            {/* Header */}
            <div className="bg-primary px-5 py-3 text-center">
              <p className="text-primary-foreground text-xs font-bold tracking-wider">
                🤔 מה הייתם מעדיפים?
              </p>
            </div>

            {/* Options */}
            <div className="bg-card">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePick("a")}
                className={`w-full px-6 py-7 text-center border-b border-border transition-all duration-300 ${
                  picked === "a"
                    ? "bg-accent/20"
                    : picked === "b"
                      ? "opacity-40"
                      : "hover:bg-secondary"
                }`}
              >
                <p className="text-lg font-bold text-foreground">{optionA}</p>
              </motion.button>

              <div className="flex items-center justify-center -my-3 relative z-10">
                <span className="bg-accent text-foreground text-xs font-extrabold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  או
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePick("b")}
                className={`w-full px-6 py-7 text-center transition-all duration-300 ${
                  picked === "b"
                    ? "bg-accent/20"
                    : picked === "a"
                      ? "opacity-40"
                      : "hover:bg-secondary"
                }`}
              >
                <p className="text-lg font-bold text-foreground">{optionB}</p>
              </motion.button>
            </div>

            {/* Skip */}
            <div className="bg-card px-5 py-3 text-center border-t border-border">
              <button
                onClick={onSkip}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                דלגו ⏭️
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WouldYouRather;
