import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";
import {
  ActionAll,
  ActionArchive,
  ActionExecute,
  ActionExpire,
  ActionSearch,
} from "../components/Section/SectionAction";
import useDocTitle from "../hooks/useDocTitle";
import useTutorial from "../hooks/useTutorial";
import { TutorialType } from "../utils/tutorial";

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
      return <Navigate to="/" replace />;
  }
};

const ActionPage = observer(() => {
  const { route } = useParams();

  useDocTitle("Reminded | 行動");
  useTutorial(TutorialType.action);

  return <section className="relative">{renderActionPage(route)}</section>;
});

export default ActionPage;
