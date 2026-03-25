import { motion } from "framer-motion";
import { levels } from "@/data/gameData";

interface LevelSelectorProps {
  currentLevel: number;
  answeredPerLevel: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
}

const LevelSelector = ({ currentLevel, answeredPerLevel, onSelectLevel }: LevelSelectorProps) => {
  return (
    <div className="flex gap-2 justify-center">
      {levels.map((level) => {
        const prevLevel = levels.find(pl => pl.id === level.id - 1);
        const isLocked = level.unlockPercent > 0 && prevLevel !== undefined &&
          (answeredPerLevel[prevLevel.id] || 0) < Math.ceil(prevLevel.questions.length * level.unlockPercent / 100) &&
          currentLevel < level.id;
        const isActive = currentLevel === level.id;

        return (
          <motion.button
            key={level.id}
            whileTap={!isLocked ? { scale: 0.95 } : undefined}
            onClick={() => !isLocked && onSelectLevel(level.id)}
            disabled={isLocked}
            className={`
              px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all
              ${isActive
                ? 'bg-accent text-white shadow-md action-shadow'
                : isLocked
                  ? 'bg-white/50 backdrop-blur-sm text-muted-foreground opacity-50 cursor-not-allowed'
                  : 'bg-white/78 backdrop-blur-sm text-foreground/75 hover:bg-white/95 hover:shadow-sm card-shadow'
              }
            `}
            style={isActive ? {} : {
              border: isLocked
                ? "1px solid rgba(196,148,148,0.20)"
                : "1px solid rgba(196,148,148,0.36)",
            }}
          >
            {isLocked ? "🔒" : level.emoji} {level.title}
          </motion.button>
        );
      })}
    </div>
  );
};

export default LevelSelector;
