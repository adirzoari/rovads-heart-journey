import { useState, useCallback, useEffect } from "react";
import { levels, specialCards } from "@/data/gameData";
import { getRandomDilemma } from "@/components/WouldYouRather";

interface HistoryEntry {
  level: number;
  questionIndex: number;
}

interface GameState {
  currentLevel: number;
  questionIndex: number;
  totalAnswered: number;
  favorites: number[];
  globalCardCount: number;
  sparks: number;
  history: HistoryEntry[];
  answeredPerLevel: Record<number, number>;
  specialIndex: number;
}

const STORAGE_KEY = "rovad_game_state";

const getInitialState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        currentLevel: parsed.currentLevel ?? 1,
        questionIndex: parsed.questionIndex ?? 0,
        totalAnswered: parsed.totalAnswered ?? 0,
        favorites: parsed.favorites ?? [],
        globalCardCount: parsed.globalCardCount ?? 0,
        sparks: parsed.sparks ?? 0,
        history: parsed.history ?? [],
        answeredPerLevel: parsed.answeredPerLevel ?? {},
        specialIndex: parsed.specialIndex ?? 0,
      };
    }
  } catch {}
  return {
    currentLevel: 1,
    questionIndex: 0,
    totalAnswered: 0,
    favorites: [],
    globalCardCount: 0,
    sparks: 0,
    history: [],
    answeredPerLevel: {},
    specialIndex: 0,
  };
};

const getNextPosition = (currentLevel: number, questionIndex: number) => {
  const level = levels.find(l => l.id === currentLevel) || levels[0];
  let nextIndex = questionIndex + 1;
  let nextLevel = currentLevel;
  let levelCompleted = false;

  if (nextIndex >= level.questions.length) {
    const nextLevelData = levels.find(l => l.id === currentLevel + 1);
    if (nextLevelData) {
      nextLevel = nextLevelData.id;
      nextIndex = 0;
      levelCompleted = true;
    } else {
      nextIndex = 0;
    }
  }

  return { nextIndex, nextLevel, levelCompleted };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(getInitialState);
  const [direction, setDirection] = useState(1);
  const [showSpecial, setShowSpecial] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState<number | null>(null);
  const [showWYR, setShowWYR] = useState(false);
  const [wyrDilemma, setWyrDilemma] = useState(getRandomDilemma());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentLevelData = levels.find(l => l.id === state.currentLevel) || levels[0];
  const currentQuestion = currentLevelData.questions[state.questionIndex];
  const currentSpecialCard = specialCards[state.specialIndex % specialCards.length];

  const triggerLevelUp = useCallback((levelId: number) => {
    setShowLevelUp(true);
    setUnlockedLevel(levelId);
  }, []);

  const applyNextPosition = useCallback((prev: GameState): Partial<GameState> => {
    const { nextIndex, nextLevel, levelCompleted } = getNextPosition(prev.currentLevel, prev.questionIndex);
    if (levelCompleted) {
      triggerLevelUp(nextLevel);
    }
    return { questionIndex: nextIndex, currentLevel: nextLevel };
  }, [triggerLevelUp]);

  const pushHistory = (prev: GameState): HistoryEntry[] => [
    ...prev.history,
    { level: prev.currentLevel, questionIndex: prev.questionIndex },
  ];

  const advance = useCallback(() => {
    setDirection(1);

    setState(prev => {
      const newHistory = pushHistory(prev);
      const newGlobalCount = prev.globalCardCount + 1;
      const newTotalAnswered = prev.totalAnswered + 1;
      const newAnsweredPerLevel = {
        ...prev.answeredPerLevel,
        [prev.currentLevel]: (prev.answeredPerLevel[prev.currentLevel] || 0) + 1,
      };

      if (newGlobalCount % 7 === 0) {
        setShowSpecial(true);
        return {
          ...prev,
          totalAnswered: newTotalAnswered,
          globalCardCount: newGlobalCount,
          history: newHistory,
          answeredPerLevel: newAnsweredPerLevel,
          specialIndex: prev.specialIndex + 1,
        };
      }

      if (newGlobalCount % 12 === 0) {
        setWyrDilemma(getRandomDilemma());
        setShowWYR(true);
        return {
          ...prev,
          totalAnswered: newTotalAnswered,
          globalCardCount: newGlobalCount,
          history: newHistory,
          answeredPerLevel: newAnsweredPerLevel,
        };
      }

      const { nextIndex, nextLevel, levelCompleted } = getNextPosition(prev.currentLevel, prev.questionIndex);
      if (levelCompleted) {
        triggerLevelUp(nextLevel);
      }

      for (const l of levels) {
        if (l.unlockPercent > 0) {
          const prevLevelData = levels.find(pl => pl.id === l.id - 1);
          if (prevLevelData) {
            const threshold = Math.ceil(prevLevelData.questions.length * l.unlockPercent / 100);
            const prevAnswered = prev.answeredPerLevel[prevLevelData.id] || 0;
            const newAnswered = newAnsweredPerLevel[prevLevelData.id] || 0;
            if (prevAnswered < threshold && newAnswered >= threshold && l.id > nextLevel) {
              triggerLevelUp(l.id);
            }
          }
        }
      }

      return {
        ...prev,
        questionIndex: nextIndex,
        currentLevel: nextLevel,
        totalAnswered: newTotalAnswered,
        globalCardCount: newGlobalCount,
        history: newHistory,
        answeredPerLevel: newAnsweredPerLevel,
      };
    });
  }, [triggerLevelUp]);

  const skip = useCallback(() => {
    setDirection(-1);
    if (showSpecial || showWYR) {
      setShowSpecial(false);
      setShowWYR(false);
      setState(prev => {
        const newHistory = pushHistory(prev);
        const next = applyNextPosition(prev);
        return { ...prev, ...next, history: newHistory };
      });
      return;
    }
    setState(prev => {
      const newHistory = pushHistory(prev);
      const newGlobalCount = prev.globalCardCount + 1;

      const { nextIndex, nextLevel, levelCompleted } = getNextPosition(prev.currentLevel, prev.questionIndex);
      if (levelCompleted) {
        triggerLevelUp(nextLevel);
      }

      if (newGlobalCount % 7 === 0) {
        setShowSpecial(true);
        return {
          ...prev,
          globalCardCount: newGlobalCount,
          questionIndex: nextIndex,
          currentLevel: nextLevel,
          history: newHistory,
          specialIndex: prev.specialIndex + 1,
        };
      }

      if (newGlobalCount % 12 === 0) {
        setWyrDilemma(getRandomDilemma());
        setShowWYR(true);
        return {
          ...prev,
          globalCardCount: newGlobalCount,
          questionIndex: nextIndex,
          currentLevel: nextLevel,
          history: newHistory,
        };
      }

      return {
        ...prev,
        questionIndex: nextIndex,
        currentLevel: nextLevel,
        globalCardCount: newGlobalCount,
        history: newHistory,
      };
    });
  }, [showSpecial, showWYR, triggerLevelUp, applyNextPosition]);

  const favorite = useCallback(() => {
    if (showSpecial) {
      setShowSpecial(false);
      setState(prev => {
        const newHistory = pushHistory(prev);
        const next = applyNextPosition(prev);
        return { ...prev, ...next, sparks: prev.sparks + 1, history: newHistory };
      });
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
  }, [advance, currentQuestion, showSpecial, applyNextPosition]);

  const goBack = useCallback(() => {
    if (state.history.length === 0) return;

    setDirection(-1);
    setShowSpecial(false);
    setShowWYR(false);

    setState(prev => {
      const newHistory = [...prev.history];
      const previousState = newHistory.pop();
      if (!previousState) return prev;

      return {
        ...prev,
        currentLevel: previousState.level,
        questionIndex: previousState.questionIndex,
        history: newHistory,
      };
    });
  }, [state.history.length]);

  const selectLevel = useCallback((levelId: number) => {
    setState(prev => ({
      ...prev,
      currentLevel: levelId,
      questionIndex: 0,
    }));
  }, []);

  const skipToNextLevel = useCallback(() => {
    setState(prev => {
      const nextLevelData = levels.find(l => l.id === prev.currentLevel + 1);
      if (nextLevelData) {
        return {
          ...prev,
          currentLevel: nextLevelData.id,
          questionIndex: 0,
        };
      }
      return prev;
    });
  }, []);

  const dismissSpecial = useCallback(() => {
    setShowSpecial(false);
  }, []);

  const handleWYRPick = useCallback(() => {
    setShowWYR(false);
    setState(prev => {
      const newHistory = pushHistory(prev);
      const next = applyNextPosition(prev);
      return { ...prev, ...next, sparks: prev.sparks + 1, history: newHistory };
    });
  }, [applyNextPosition]);

  const dismissWYR = useCallback(() => {
    setShowWYR(false);
    setState(prev => {
      const newHistory = pushHistory(prev);
      const next = applyNextPosition(prev);
      return { ...prev, ...next, history: newHistory };
    });
  }, [applyNextPosition]);

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
      history: [],
      answeredPerLevel: {},
      specialIndex: 0,
    });
    setShowSpecial(false);
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
    showWYR,
    wyrDilemma,
    direction,
    state,
    houseProgress,
    advance,
    skip,
    favorite,
    goBack,
    canGoBack: state.history.length > 0,
    selectLevel,
    skipToNextLevel,
    dismissSpecial,
    dismissLevelUp,
    handleWYRPick,
    dismissWYR,
    resetGame,
  };
};
