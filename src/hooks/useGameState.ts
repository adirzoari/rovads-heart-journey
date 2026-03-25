import { useState, useCallback, useEffect } from "react";
import { levels, specialCards } from "@/data/gameData";

interface GameState {
  currentLevel: number;
  questionIndex: number;
  totalAnswered: number;
  favorites: number[];
  globalCardCount: number;
  sparks: number; // new spark/chemistry counter
}

const STORAGE_KEY = "rovad_game_state";

const getInitialState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    currentLevel: 1,
    questionIndex: 0,
    totalAnswered: 0,
    favorites: [],
    globalCardCount: 0,
    sparks: 0,
  };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(getInitialState);
  const [direction, setDirection] = useState(1);
  const [showSpecial, setShowSpecial] = useState(false);
  const [specialIndex, setSpecialIndex] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentLevelData = levels.find(l => l.id === state.currentLevel) || levels[0];
  const currentQuestion = currentLevelData.questions[state.questionIndex];
  const currentSpecialCard = specialCards[specialIndex % specialCards.length];

  const advance = useCallback(() => {
    setDirection(1);

    setState(prev => {
      const newGlobalCount = prev.globalCardCount + 1;
      const newTotalAnswered = prev.totalAnswered + 1;

      // Check if next card should be special (every 7)
      if (newGlobalCount % 7 === 0) {
        setShowSpecial(true);
        setSpecialIndex(i => i + 1);
        return { ...prev, totalAnswered: newTotalAnswered, globalCardCount: newGlobalCount };
      }

      const level = levels.find(l => l.id === prev.currentLevel) || levels[0];
      let nextIndex = prev.questionIndex + 1;
      let nextLevel = prev.currentLevel;

      if (nextIndex >= level.questions.length) {
        const nextLevelData = levels.find(l => l.id === prev.currentLevel + 1);
        if (nextLevelData && newTotalAnswered >= nextLevelData.unlockAt) {
          nextLevel = nextLevelData.id;
          nextIndex = 0;
          setShowLevelUp(true);
          setUnlockedLevel(nextLevelData.id);
        } else {
          nextIndex = 0;
        }
      }

      // Check if a new level just got unlocked (even if we don't auto-switch)
      for (const l of levels) {
        if (l.unlockAt === newTotalAnswered && l.id > prev.currentLevel) {
          setShowLevelUp(true);
          setUnlockedLevel(l.id);
        }
      }

      return {
        ...prev,
        questionIndex: nextIndex,
        currentLevel: nextLevel,
        totalAnswered: newTotalAnswered,
        globalCardCount: newGlobalCount,
      };
    });
  }, []);

  const skip = useCallback(() => {
    setDirection(-1);
    if (showSpecial) {
      setShowSpecial(false);
      return;
    }
    setState(prev => {
      const level = levels.find(l => l.id === prev.currentLevel) || levels[0];
      let nextIndex = prev.questionIndex + 1;
      if (nextIndex >= level.questions.length) nextIndex = 0;
      return { ...prev, questionIndex: nextIndex, globalCardCount: prev.globalCardCount + 1 };
    });
  }, [showSpecial]);

  const favorite = useCallback(() => {
    if (showSpecial) {
      setShowSpecial(false);
      setState(prev => ({ ...prev, sparks: prev.sparks + 1 }));
      // After dismissing special, advance to next question
      setTimeout(() => {
        setState(prev => {
          const level = levels.find(l => l.id === prev.currentLevel) || levels[0];
          let nextIndex = prev.questionIndex + 1;
          if (nextIndex >= level.questions.length) nextIndex = 0;
          return { ...prev, questionIndex: nextIndex };
        });
      }, 100);
      return;
    }
    if (currentQuestion) {
      setState(prev => ({
        ...prev,
        favorites: [...prev.favorites, currentQuestion.id],
        sparks: prev.sparks + 1,
      }));
    }
    advance();
  }, [advance, currentQuestion, showSpecial]);

  const selectLevel = useCallback((levelId: number) => {
    setState(prev => ({
      ...prev,
      currentLevel: levelId,
      questionIndex: 0,
    }));
  }, []);

  const dismissSpecial = useCallback(() => {
    setShowSpecial(false);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setShowLevelUp(false);
    setUnlockedLevel(null);
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      currentLevel: 1,
      questionIndex: 0,
      totalAnswered: 0,
      favorites: [],
      globalCardCount: 0,
      sparks: 0,
    });
    setShowSpecial(false);
    setSpecialIndex(0);
  }, []);

  const totalQuestions = levels.reduce((sum, l) => sum + l.questions.length, 0);
  const houseProgress = Math.min(state.totalAnswered / totalQuestions, 1);

  return {
    currentQuestion,
    currentLevelData,
    currentSpecialCard,
    showSpecial,
    showLevelUp,
    unlockedLevel,
    direction,
    state,
    houseProgress,
    advance,
    skip,
    favorite,
    selectLevel,
    dismissSpecial,
    dismissLevelUp,
    resetGame,
  };
};
