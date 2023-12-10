import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ActionAll,
  ActionArchive,
  ActionExecute,
  ActionExpire,
  ActionSearch,
} from "../components/SectionAction";
import { authStore } from "../store/authStore";
import { actionSteps, initTutorial } from "../utils/tutorial";
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

const ActionPage = observer(() => {
  const { route } = useParams();

  useEffect(() => {
    const isTutorialDone = authStore.tutorialProgress?.action;
    if (isTutorialDone !== undefined && !isTutorialDone) {
      initTutorial(actionSteps, {
        onDestroyed: () => authStore.updateTutorialProgress("action"),
      });
    }
  }, [authStore.tutorialProgress?.action]);

  return <section className="relative">{renderActionPage(route)}</section>;
});

export default ActionPage;
