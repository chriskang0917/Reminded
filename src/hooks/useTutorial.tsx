import { useEffect, useState } from "react";
import { authStore } from "../store/authStore";
import {
  TutorialType,
  actionSteps,
  ideaSteps,
  initTutorial,
  todaySteps,
  todoSteps,
  tutorial,
} from "../utils/tutorial";

const stepStrategy = {
  today: todaySteps,
  idea: ideaSteps,
  action: actionSteps,
  todo: todoSteps,
};

function useTutorial(type: TutorialType) {
  const [isWidthLessThan876, setIsWidthLessThan876] = useState<boolean>(() => {
    return window.innerWidth < 876;
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 876) {
        setIsWidthLessThan876(true);
      } else {
        setIsWidthLessThan876(false);
      }
    });
  }, [isWidthLessThan876]);

  useEffect(() => {
    const isTutorialDone = authStore.tutorialProgress[type];
    tutorial.destroy();
    if (isWidthLessThan876) return;
    if (isTutorialDone !== undefined && !isTutorialDone)
      initTutorial(stepStrategy[type], {
        onDestroyed: () => authStore.updateTutorialProgress(type),
      });
  }, [authStore.tutorialProgress?.[type], isWidthLessThan876]);
}

export default useTutorial;
