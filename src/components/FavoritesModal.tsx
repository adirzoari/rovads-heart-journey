import { motion, AnimatePresence } from "framer-motion";
import { levels } from "@/data/gameData";

interface FavoritesModalProps {
  show: boolean;
  favoriteIds: number[];
  onDismiss: () => void;
}

const FavoritesModal = ({ show, favoriteIds, onDismiss }: FavoritesModalProps) => {
  const allQuestions = levels.flatMap(level => 
    level.questions.map(q => ({ ...q, level: level.title, emoji: level.emoji }))
  );

  const favoriteQuestions = allQuestions.filter(q => favoriteIds.includes(q.id));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 max-w-md w-full max-h-[80vh] flex flex-col card-shadow card-gradient"
            style={{ border: "1px solid rgba(196,148,148,0.36)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">❤️ השאלות שלי</h2>
              <button
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
                aria-label="סגור"
              >
                ×
              </button>
            </div>

            {favoriteQuestions.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <p className="text-muted-foreground text-center">
                  עדיין לא שמרת שאלות למועדפים
                  <br />
                  <span className="text-sm">לחץ על ❤️ כדי לשמור שאלות</span>
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {favoriteQuestions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4"
                    style={{ border: "1px solid rgba(196,148,148,0.28)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {q.emoji} {q.level}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {q.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDismiss}
              className="mt-4 px-6 py-2.5 rounded-full btn-primary-gradient text-white font-semibold action-shadow w-full"
            >
              סגור
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FavoritesModal;
