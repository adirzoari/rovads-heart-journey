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
              px-4 py-2 rounded-full text-xs font-semibold transition-all
              ${isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : isLocked
                  ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }
            `}
          >
            {isLocked ? "🔒" : level.emoji} {level.title}
          </motion.button>
        );
      })}
    </div>
  );
};

export default LevelSelector;
