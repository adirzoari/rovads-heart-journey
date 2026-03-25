import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface GameCardProps {
  text: string;
  levelTitle: string;
  levelEmoji: string;
  isSpecial: boolean;
  cardNumber: number;
  totalInLevel: number;
  onSkip: () => void;
  onFavorite: () => void;
  onBack?: () => void;
  canGoBack?: boolean;
  direction: number;
  cardKey: string;
}

const GameCard = ({
  text,
  levelTitle,
  levelEmoji,
  isSpecial,
  cardNumber,
  totalInLevel,
  onSkip,
  onFavorite,
  onBack,
  canGoBack = false,
  direction,
  cardKey,
}: GameCardProps) => {

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -100 && canGoBack) {
      onBack?.();
    } else if (info.offset.x > 100) {
      onSkip();
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir < 0 ? 15 : -15,
    }),
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: "1000px" }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={cardKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          className={`
            relative rounded-2xl p-8 min-h-[320px] flex flex-col justify-between cursor-grab active:cursor-grabbing
            card-shadow
            ${isSpecial
              ? 'gold-border bg-gradient-to-br from-background to-secondary'
              : 'bg-card border border-border'
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground tracking-wide">
              {isSpecial ? "✨ קלף זהב" : `${levelEmoji} ${levelTitle}`}
            </span>
            {!isSpecial && (
              <span className="text-xs text-muted-foreground">
                {cardNumber}/{totalInLevel}
              </span>
            )}
          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center py-6">
            <p className={`text-center leading-relaxed ${isSpecial ? 'text-xl font-bold text-accent' : 'text-2xl font-bold text-foreground'}`}>
              {text}
            </p>
          </div>

          {/* Decorative element for special cards */}
          {isSpecial && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(43, 76%, 52%, 0.2)",
                  "0 0 40px hsl(43, 76%, 52%, 0.4)",
                  "0 0 20px hsl(43, 76%, 52%, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Swipe hint */}
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            החליקו שמאלה לחזור | ימינה לדלג
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="relative group">
          <motion.button
            whileTap={canGoBack ? { scale: 0.9 } : undefined}
            onClick={onBack}
            disabled={!canGoBack}
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${
              canGoBack
                ? 'border-border bg-card card-shadow hover:border-muted-foreground cursor-pointer'
                : 'border-border/30 bg-card/50 cursor-not-allowed opacity-40'
            }`}
            aria-label="חזור אחורה"
          >
            <span className="text-xl">⬅️</span>
          </motion.button>
          {canGoBack && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              <span className="text-[10px] text-muted-foreground bg-background/90 px-2 py-1 rounded shadow-sm">
                חזור אחורה
              </span>
            </div>
          )}
        </div>

        <div className="relative group">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onFavorite}
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center card-shadow hover:opacity-90 transition-opacity"
            aria-label="עניתי על השאלה"
          >
            <span className="text-2xl">❤️</span>
          </motion.button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <span className="text-[10px] text-muted-foreground bg-background/90 px-2 py-1 rounded shadow-sm">
              עניתי - בונה את הבית
            </span>
          </div>
        </div>

        <div className="relative group">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onSkip}
            className="w-14 h-14 rounded-full border-2 border-border bg-card flex items-center justify-center card-shadow hover:border-muted-foreground transition-colors"
            aria-label="דלג על השאלה"
          >
            <span className="text-xl">➡️</span>
          </motion.button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <span className="text-[10px] text-muted-foreground bg-background/90 px-2 py-1 rounded shadow-sm">
              דלג על השאלה
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
