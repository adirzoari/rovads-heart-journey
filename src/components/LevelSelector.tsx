import { motion } from "framer-motion";
import { levels } from "@/data/gameData";

interface LevelSelectorProps {
  currentLevel: number;
  answeredPerLevel: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
}

const LevelSelector = ({ currentLevel, answeredPerLevel, onSelectLevel }: LevelSelectorProps) => {
  return (
    <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center flex-wrap">
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
              px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all
              ${isActive
                ? 'btn-primary-gradient text-foreground shadow-md action-shadow'
                : isLocked
                  ? 'bg-card/40 backdrop-blur-sm text-muted-foreground opacity-50 cursor-not-allowed border border-border/25'
                  : 'glass-button text-foreground/75 hover:bg-card/85 hover:shadow-sm card-shadow'
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
