import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IdeaAction,
  IdeaAll,
  IdeaArchive,
  IdeaSearch,
  IdeaWeek,
} from "../components/SectionIdea";
import { authStore } from "../store/authStore";
import { ideaSteps, initTutorial } from "../utils/tutorial";
import ErrorPage from "./ErrorPage";

const renderIdeaPage = (route: string | undefined) => {
  switch (route) {
    case "week":
      return <IdeaWeek />;
    case "search":
      return <IdeaSearch />;
    case "pools":
      return <IdeaAll />;
    case "action":
      return <IdeaAction />;
    case "archive":
      return <IdeaArchive />;
    default:
      return <ErrorPage />;
  }
};

const IdeaPage = observer(() => {
  const { route } = useParams();

  useEffect(() => {
    const isTutorialDone = authStore.tutorialProgress.idea;
    if (isTutorialDone !== undefined && !isTutorialDone) {
      initTutorial(ideaSteps, {
        onDestroyed: () => authStore.updateTutorialProgress("idea"),
      });
    }
  }, [authStore.tutorialProgress?.idea]);

  return <section className="relative">{renderIdeaPage(route)}</section>;
});

export default IdeaPage;
