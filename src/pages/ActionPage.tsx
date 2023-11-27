import { useParams } from "react-router-dom";
import { ActionSearch } from "../components/SectionAction";
import { ActionAll } from "../components/SectionAction/ActionAll";
import { ActionExpire } from "../components/SectionAction/ActionExpire";

const renderActionPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <ActionAll />;
    case "search":
      return <ActionSearch />;
    case "expire":
      return <ActionExpire />;
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
