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
    className="min-h-screen flex flex-col items-center justify-center px-6 gap-8"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="text-center"
    >
      <h1 className="text-5xl font-extrabold text-foreground mb-2">רובד</h1>
      <div className="w-16 h-0.5 gold-shimmer mx-auto rounded-full mb-4" />
      <p className="text-muted-foreground text-lg font-medium">משחק קלפים לחיבור אמיתי</p>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl p-6 card-shadow max-w-xs text-center border border-border"
    >
      <p className="text-sm text-muted-foreground leading-relaxed">
        שלושה רבדים של שאלות שיובילו אתכם מגישוש קליל לשיחה עמוקה ומשמעותית.
        <br /><br />
        <span className="text-accent font-semibold">❤️ לחצו לב</span> כדי לבנות את הבית המשותף שלכם ולצבור ניצוצות.
      </p>
    </motion.div>

    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
      className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg card-shadow hover:opacity-90 transition-opacity"
    >
      יוצאים לדרך ✨
    </motion.button>
  </motion.div>
);

const SparkCounter = ({ sparks, onClick }: { sparks: number; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full hover:bg-secondary/80 transition-colors cursor-pointer"
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
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" onStart={() => setStarted(true)} />
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col px-4 py-6 max-w-lg mx-auto"
          >
            {/* Top bar */}
            <div className="flex items-start justify-between mb-4">
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
            <div className="mb-6">
              <LevelSelector
                currentLevel={state.currentLevel}
                totalAnswered={state.totalAnswered}
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
