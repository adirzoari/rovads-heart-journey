import { motion, AnimatePresence } from "framer-motion";
import { levels } from "@/data/gameData";

interface LevelUpModalProps {
  show: boolean;
  levelId: number | null;
  onDismiss: () => void;
}

const LevelUpModal = ({ show, levelId, onDismiss }: LevelUpModalProps) => {
  const level = levels.find(l => l.id === levelId);

  return (
    <AnimatePresence>
      {show && level && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-6"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-card rounded-3xl p-8 max-w-xs w-full text-center card-shadow gold-border"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-5xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">רובד חדש נפתח!</h2>
            <p className="text-lg font-bold text-accent mb-1">{level.emoji} {level.title}</p>
            <p className="text-sm text-muted-foreground mb-6">המשיכו לצלול לעומק...</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onDismiss}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold card-shadow"
            >
              יאללה! ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpModal;
