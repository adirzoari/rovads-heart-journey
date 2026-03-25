import { motion, AnimatePresence } from "framer-motion";
import { levels } from "@/data/gameData";

interface LevelUpModalProps {
  show: boolean;
  levelId: number | null;
  onDismiss: () => void;
}

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (360 / 12) * i,
  delay: i * 0.08,
  distance: 90 + Math.random() * 40,
  size: 6 + Math.random() * 8,
  emoji: i % 2 === 0 ? "✨" : "💖",
}));

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
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="glass-card rounded-[2rem] p-6 sm:p-10 md:p-12 lg:p-14 max-w-[85vw] sm:max-w-xs md:max-w-sm lg:max-w-md w-full text-center card-shadow relative overflow-visible"
            onClick={e => e.stopPropagation()}
          >
            {/* Sparkle particles */}
            {sparkles.map(s => (
              <motion.span
                key={s.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.5],
                  x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
                  y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.3 + s.delay,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{ fontSize: s.size }}
              >
                {s.emoji}
              </motion.span>
            ))}

            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
              className="relative inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3"
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: ["0 0 0 0 rgba(255,215,0,0.4)", "0 0 0 20px rgba(255,215,0,0)", "0 0 0 0 rgba(255,215,0,0)"] }}
                transition={{ duration: 1.6, delay: 0.4, repeat: 2 }}
              />
              🎉
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-2"
            >
              רובד חדש נפתח!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1"
            >
              {level.emoji} {level.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8"
            >
              המשיכו לצלול לעומק...
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDismiss}
              className="px-8 sm:px-10 md:px-12 lg:px-14 py-3 md:py-4 rounded-full btn-primary-gradient text-foreground font-bold action-shadow text-base sm:text-lg md:text-xl"
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
