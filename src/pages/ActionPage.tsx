import { useParams } from "react-router-dom";
import { ActionSearch } from "../components/SectionAction";

const renderActionPage = (type: string | undefined) => {
  switch (type) {
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
  const { type } = useParams();

  return <section>{renderActionPage(type)}</section>;
}

export default ActionPage;
