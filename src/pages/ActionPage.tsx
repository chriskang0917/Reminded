import { useParams } from "react-router-dom";
import {
  ActionAll,
  ActionArchive,
  ActionExecute,
  ActionExpire,
  ActionSearch,
} from "../components/SectionAction";
import ErrorPage from "./ErrorPage";

const renderActionPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <ActionAll />;
    case "search":
      return <ActionSearch />;
    case "expire":
      return <ActionExpire />;
    case "executed":
      return <ActionExecute />;
    case "archive":
      return <ActionArchive />;
    default:
      return <ErrorPage />;
  }
};

function ActionPage() {
  const { route } = useParams();

  return <section>{renderActionPage(route)}</section>;
}

export default ActionPage;
