import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IdeaAction,
  IdeaAll,
  IdeaArchive,
  IdeaSearch,
  IdeaWeek,
} from "../components/SectionIdea";
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

function IdeaPage() {
  const { route } = useParams();

  useEffect(() => {
    initTutorial(ideaSteps);
  }, []);

  return <section className="relative">{renderIdeaPage(route)}</section>;
}

export default IdeaPage;
