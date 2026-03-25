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
    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto" style={{ perspective: "1000px" }}>
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
          style={{
            touchAction: "none",
          }}
          className={`
            relative rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 min-h-[300px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[480px] flex flex-col justify-between cursor-grab active:cursor-grabbing
            card-shadow
            ${isSpecial
              ? 'glass-card-special'
              : 'glass-card'
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] sm:text-xs md:text-sm font-bold tracking-wide px-2.5 py-1 md:px-3 md:py-1.5 rounded-full ${isSpecial ? 'bg-accent/15 text-foreground border border-accent/30' : 'bg-foreground/10 text-foreground border border-border/40'}`}
            >
              {isSpecial ? "✨ קלף זהב" : `${levelEmoji} ${levelTitle}`}
            </span>
            {!isSpecial && (
              <span className="text-[11px] sm:text-xs md:text-sm font-medium text-foreground bg-foreground/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-border/30">
                {cardNumber}/{totalInLevel}
              </span>
            )}
          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center py-5 sm:py-8 md:py-10">
            <p className={`text-center leading-loose ${isSpecial ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground' : 'text-xl sm:text-[1.6rem] md:text-3xl lg:text-4xl font-bold text-foreground'}`}>
              {text}
            </p>
          </div>

          {/* Decorative element for special cards */}
          {isSpecial && (
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 24px rgba(255, 215, 0, 0.25)",
                  "0 0 50px rgba(255, 215, 0, 0.45)",
                  "0 0 24px rgba(255, 215, 0, 0.25)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          )}

          {/* Swipe hint */}
          <p className="text-center text-[9px] text-muted-foreground/50 mt-1 tracking-wide">
            החליקו שמאלה לחזור · ימינה לדלג
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-5 sm:mt-8 md:mt-10">
        {/* Back button */}
        <div className="relative group">
          <motion.button
            whileTap={canGoBack ? { scale: 0.9 } : undefined}
            onClick={onBack}
            disabled={!canGoBack}
            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full flex items-center justify-center transition-all ${
              canGoBack
                ? 'glass-button card-shadow hover:bg-card/85 cursor-pointer'
                : 'bg-card/40 backdrop-blur-sm cursor-not-allowed opacity-40 border border-border/30'
            }`}
            aria-label="חזור אחורה"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70 sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px]">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </motion.button>
          {canGoBack && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <span className="text-[10px] text-foreground bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-border/30">
              חזור אחורה
            </span>
          </div>
          )}
        </div>

        {/* Heart/Favorite button */}
        <div className="relative group">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onFavorite}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full btn-primary-gradient flex items-center justify-center action-shadow hover:scale-105 transition-transform"
            aria-label="עניתי על השאלה"
            style={{ animation: "heartbeat 0.001s" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-foreground">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <span className="text-[10px] text-foreground bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-border/30">
              עניתי - בונה את הבית
            </span>
          </div>
        </div>

        {/* Skip button */}
        <div className="relative group">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onSkip}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full glass-button flex items-center justify-center card-shadow hover:bg-card/85 transition-all"
            aria-label="דלג על השאלה"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70 sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px]">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </motion.button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <span className="text-[10px] text-foreground bg-card/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-border/30">
              דלג על השאלה
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
