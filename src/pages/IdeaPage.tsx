import { useParams } from "react-router-dom";
import {
  IdeaAction,
  IdeaArchive,
  IdeaPools,
  IdeaSearch,
  IdeaWeek,
} from "../components/SectionIdea";
import ErrorPage from "./ErrorPage";

const renderIdeaPage = (route: string | undefined) => {
  switch (route) {
    case "week":
      return <IdeaWeek />;
    case "search":
      return <IdeaSearch />;
    case "pools":
      return <IdeaPools />;
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
  return <section>{renderIdeaPage(route)}</section>;
}

export default IdeaPage;
