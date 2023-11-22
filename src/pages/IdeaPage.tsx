import { useParams } from "react-router-dom";
import { IdeaSearch } from "../components/SectionIdea/IdeaSearch";

const renderIdeaPage = (type: string | undefined) => {
  switch (type) {
    case "all":
      return <section>All</section>;
    case "search":
      return <IdeaSearch />;
    case "overdue":
      return <section>Overdue</section>;
    case "executed":
      return <section>Executed</section>;
    case "archive":
      return <section>Archive</section>;
    default:
      return <section>404</section>;
  }
};

function IdeaPage() {
  const { type } = useParams();

  return <section>{renderIdeaPage(type)}</section>;
}

export default IdeaPage;
