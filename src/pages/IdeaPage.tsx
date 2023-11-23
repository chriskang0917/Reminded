import { useParams } from "react-router-dom";
import {
  IdeaAction,
  IdeaArchive,
  IdeaPools,
  IdeaWeek,
} from "../components/SectionIdea";
import { IdeaSearch } from "../components/SectionIdea/IdeaSearch";

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
  }
};

function IdeaPage() {
  const { route } = useParams();
  return <section>{renderIdeaPage(route)}</section>;
}

export default IdeaPage;
