import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameCard from "@/components/GameCard";
import WouldYouRather from "@/components/WouldYouRather";
import HouseProgress from "@/components/HouseProgress";
import LevelSelector from "@/components/LevelSelector";
import LevelUpModal from "@/components/LevelUpModal";
import FavoritesModal from "@/components/FavoritesModal";
import { useGameState } from "@/hooks/useGameState";
import { useDarkMode } from "@/hooks/useDarkMode";
import { levels } from "@/data/gameData";

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 gap-6 sm:gap-8 md:gap-10"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="text-center"
    >
      {/* Brand logo — two overlapping hearts */}
      <div className="flex justify-center mb-4">
        <svg width="72" height="64" viewBox="0 0 72 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heartGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(45, 100%, 60%)" />
              <stop offset="100%" stopColor="hsl(48, 100%, 67%)" />
            </linearGradient>
            <linearGradient id="heartGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(350, 100%, 88%)" />
              <stop offset="100%" stopColor="hsl(350, 100%, 92%)" />
            </linearGradient>
          </defs>
          <path d="M22 12C16 12 10 17.5 10 25.5C10 37 22 48 30 54C38 48 50 37 50 25.5C50 17.5 44 12 38 12C34 12 30.5 14 28 17C27 15 25 12 22 12Z"
            fill="url(#heartGradient1)" opacity="0.88"/>
          <path d="M34 18C28 18 22 23.5 22 31.5C22 43 34 54 42 60C50 54 62 43 62 31.5C62 23.5 56 18 50 18C46 18 42.5 20 40 23C39 21 37 18 34 18Z"
            fill="url(#heartGradient2)" opacity="0.92"/>
        </svg>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-1 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">רובד</h1>
      <div className="w-16 sm:w-20 md:w-24 h-0.5 gold-shimmer mx-auto rounded-full mb-3" />
      <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium">משחק קלפים לחיבור אמיתי</p>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-card rounded-3xl p-5 sm:p-6 md:p-8 card-shadow w-full max-w-xs sm:max-w-sm md:max-w-md text-center"
    >
      <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
        שלושה רבדים של שאלות שיובילו אתכם מגישוש קליל לשיחה עמוקה ומשמעותית.
        <br /><br />
        <span className="font-bold text-foreground">לחצו לב ❤️</span> כדי לבנות את הבית המשותף שלכם ולצבור ניצוצות.
      </p>
    </motion.div>

    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
      className="px-10 sm:px-12 md:px-16 py-3.5 sm:py-4 md:py-5 rounded-full btn-primary-gradient text-foreground font-bold text-base sm:text-lg md:text-xl action-shadow hover:opacity-90 transition-opacity"
    >
      יוצאים לדרך ✨
    </motion.button>
  </motion.div>
);

const SparkCounter = ({ sparks, onClick }: { sparks: number; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1.5 glass-button px-3 py-1.5 md:px-4 md:py-2 rounded-full card-shadow hover:bg-card/85 transition-all cursor-pointer"
    key={sparks}
    animate={sparks > 0 ? { scale: [1, 1.15, 1] } : undefined}
    transition={{ duration: 0.3 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-sm md:text-base">✨</span>
    <span className="text-xs md:text-sm font-bold text-foreground">{sparks}</span>
  </motion.button>
);

const Index = () => {
  const [started, setStarted] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const {
    currentQuestion,
    currentLevelData,
    currentSpecialCard,
    showSpecial,
    showLevelUp,
    unlockedLevel,
    showWYR,
    wyrDilemma,
    direction,
    state,
    houseProgress,
    skip,
    favorite,
    goBack,
    canGoBack,
    selectLevel,
    skipToNextLevel,
    dismissLevelUp,
    handleWYRPick,
    dismissWYR,
    resetGame,
  } = useGameState();

  return (
    <div className="min-h-screen relative">

      <div className="relative" style={{ zIndex: 1 }}>
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" onStart={() => setStarted(true)} />
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto"
          >
            {/* Top bar */}
            <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6 glass-card rounded-2xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 card-shadow">
              <HouseProgress progress={houseProgress} />
              <div className="flex flex-col items-end gap-2 mt-1">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={toggleDarkMode}
                    whileTap={{ scale: 0.9 }}
                    className="glass-button w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center card-shadow hover:bg-card/85 transition-all"
                    aria-label="החלף מצב תצוגה"
                  >
                    <span className="text-sm md:text-base">{isDark ? "☀️" : "🌙"}</span>
                  </motion.button>
                  <SparkCounter sparks={state.sparks} onClick={() => setShowFavorites(true)} />
                </div>
                <button
                  onClick={resetGame}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  התחל מחדש
                </button>
              </div>
            </div>

            {/* Level selector */}
            <div className="mb-4 sm:mb-6 space-y-3">
              <LevelSelector
                currentLevel={state.currentLevel}
                answeredPerLevel={state.answeredPerLevel}
                onSelectLevel={selectLevel}
              />
              
              {/* Level progress bar */}
              <div className="glass-card rounded-2xl px-4 md:px-6 py-3 md:py-4 card-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-foreground/70 tracking-wide">
                    התקדמות ברובד {currentLevelData.emoji}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-foreground">
                    {state.answeredPerLevel[state.currentLevel] || 0}/{currentLevelData.questions.length}
                  </span>
                </div>
                <div className="h-2 md:h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full btn-primary-gradient"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((state.answeredPerLevel[state.currentLevel] || 0) / currentLevelData.questions.length) * 100}%` 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Card area */}
            <div className="flex-1 flex items-center">
              {showWYR ? (
                <WouldYouRather
                  show={true}
                  optionA={wyrDilemma.a}
                  optionB={wyrDilemma.b}
                  onPick={handleWYRPick}
                  onSkip={dismissWYR}
                />
              ) : showSpecial && currentSpecialCard ? (
                <GameCard
                  key={`special-${currentSpecialCard.id}-${state.globalCardCount}`}
                  cardKey={`special-${currentSpecialCard.id}-${state.globalCardCount}`}
                  text={currentSpecialCard.text}
                  levelTitle="קלף זהב"
                  levelEmoji="✨"
                  isSpecial={true}
                  cardNumber={0}
                  totalInLevel={0}
                  onSkip={skip}
                  onFavorite={favorite}
                  onBack={goBack}
                  canGoBack={canGoBack}
                  direction={direction}
                />
              ) : currentQuestion ? (
                <GameCard
                  key={`q-${currentQuestion.id}`}
                  cardKey={`q-${currentQuestion.id}`}
                  text={currentQuestion.text}
                  levelTitle={currentLevelData.title}
                  levelEmoji={currentLevelData.emoji}
                  isSpecial={false}
                  cardNumber={state.questionIndex + 1}
                  totalInLevel={currentLevelData.questions.length}
                  onSkip={skip}
                  onFavorite={favorite}
                  onBack={goBack}
                  canGoBack={canGoBack}
                  direction={direction}
                />
              ) : null}
            </div>

            {/* Footer */}
            <div className="relative text-center py-4">
              {/* Skip level button - subtle, bottom left */}
              {state.currentLevel < levels.length && (
                <button
                  onClick={skipToNextLevel}
                  className="absolute left-0 bottom-4 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors underline"
                >
                  דלג לרובד הבא ⏭
                </button>
              )}
              
              <p className="text-[10px] sm:text-xs text-muted-foreground/60">
                Developed by Adir Zoari • פותח על ידי אדיר זוארי
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>

      {/* Level up modal */}
      <LevelUpModal
        show={showLevelUp}
        levelId={unlockedLevel}
        onDismiss={dismissLevelUp}
      />

      {/* Favorites modal */}
      <FavoritesModal
        show={showFavorites}
        favoriteIds={state.favorites}
        onDismiss={() => setShowFavorites(false)}
      />
    </div>
  );
};

export default Index;
