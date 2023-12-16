import { useEffect } from "react";
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
  useEffect(() => {
    const isTutorialDone = authStore.tutorialProgress[type];
    tutorial.destroy();
    if (isTutorialDone !== undefined && !isTutorialDone)
      initTutorial(stepStrategy[type], {
        onDestroyed: () => authStore.updateTutorialProgress(type),
      });
  }, [authStore.tutorialProgress?.[type]]);
}

export default useTutorial;
