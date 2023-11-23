import { useParams } from "react-router-dom";
import { ActionSearch } from "../components/SectionAction";

const renderActionPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <section>All</section>;
    case "search":
      return <ActionSearch />;
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

function ActionPage() {
  const { route } = useParams();

  return <section>{renderActionPage(route)}</section>;
}

export default ActionPage;
