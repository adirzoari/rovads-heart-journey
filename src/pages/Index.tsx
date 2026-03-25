import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameCard from "@/components/GameCard";
import WouldYouRather from "@/components/WouldYouRather";
import HouseProgress from "@/components/HouseProgress";
import LevelSelector from "@/components/LevelSelector";
import LevelUpModal from "@/components/LevelUpModal";
import FavoritesModal from "@/components/FavoritesModal";
import { useGameState } from "@/hooks/useGameState";

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 gap-6 sm:gap-8"
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
          <path d="M22 12C16 12 10 17.5 10 25.5C10 37 22 48 30 54C38 48 50 37 50 25.5C50 17.5 44 12 38 12C34 12 30.5 14 28 17C27 15 25 12 22 12Z"
            fill="hsl(260,55%,68%)" opacity="0.85"/>
          <path d="M34 18C28 18 22 23.5 22 31.5C22 43 34 54 42 60C50 54 62 43 62 31.5C62 23.5 56 18 50 18C46 18 42.5 20 40 23C39 21 37 18 34 18Z"
            fill="hsl(24,90%,72%)" opacity="0.90"/>
        </svg>
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-1" style={{ background: "linear-gradient(135deg, hsl(260,55%,58%) 0%, hsl(24,90%,65%) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>רובד</h1>
      <div className="w-16 h-0.5 gold-shimmer mx-auto rounded-full mb-3" />
      <p className="text-muted-foreground text-base font-medium">משחק קלפים לחיבור אמיתי</p>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="card-gradient rounded-3xl p-5 sm:p-6 card-shadow w-full max-w-xs text-center border border-white/70"
    >
      <p className="text-sm text-muted-foreground leading-relaxed">
        שלושה רבדים של שאלות שיובילו אתכם מגישוש קליל לשיחה עמוקה ומשמעותית.
        <br /><br />
        <span className="text-accent font-semibold">לחצו לב</span> כדי לבנות את הבית המשותף שלכם ולצבור ניצוצות.
      </p>
    </motion.div>

    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
      className="px-10 sm:px-12 py-3.5 sm:py-4 rounded-full btn-primary-gradient text-white font-bold text-base sm:text-lg action-shadow hover:opacity-90 transition-opacity"
    >
      יוצאים לדרך ✨
    </motion.button>
  </motion.div>
);

const SparkCounter = ({ sparks, onClick }: { sparks: number; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-white/80 px-3 py-1.5 rounded-full card-shadow hover:bg-white/85 transition-all cursor-pointer"
    key={sparks}
    animate={sparks > 0 ? { scale: [1, 1.15, 1] } : undefined}
    transition={{ duration: 0.3 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-sm">✨</span>
    <span className="text-xs font-bold text-foreground">{sparks}</span>
  </motion.button>
);

const Index = () => {
  const [started, setStarted] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
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
    dismissLevelUp,
    handleWYRPick,
    dismissWYR,
    resetGame,
  } = useGameState();

  return (
    <div className="min-h-screen relative">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute rounded-full"
          style={{
            top: "-160px",
            right: "-160px",
            width: "520px",
            height: "520px",
            background: "radial-gradient(circle, hsla(260,55%,72%,0.42) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "orb-float 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-160px",
            left: "-160px",
            width: "520px",
            height: "520px",
            background: "radial-gradient(circle, hsla(24,90%,76%,0.38) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "orb-float-reverse 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "40%",
            left: "-80px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, hsla(260,45%,76%,0.22) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "orb-float 15s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" onStart={() => setStarted(true)} />
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col px-3 sm:px-4 py-4 sm:py-6 max-w-lg mx-auto"
          >
            {/* Top bar */}
            <div className="flex items-start justify-between mb-3 sm:mb-4 card-gradient rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 card-shadow border border-white/70">
              <HouseProgress progress={houseProgress} />
              <div className="flex flex-col items-end gap-2 mt-1">
                <SparkCounter sparks={state.sparks} onClick={() => setShowFavorites(true)} />
                <button
                  onClick={resetGame}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  התחל מחדש
                </button>
              </div>
            </div>

            {/* Level selector */}
            <div className="mb-4 sm:mb-6">
              <LevelSelector
                currentLevel={state.currentLevel}
                answeredPerLevel={state.answeredPerLevel}
                onSelectLevel={selectLevel}
              />
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
            <div className="text-center py-4">
              <p className="text-[10px] text-muted-foreground">
                {state.totalAnswered} שאלות נענו • {state.favorites.length} שמורות • ✨ {state.sparks} ניצוצות
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-2">
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
