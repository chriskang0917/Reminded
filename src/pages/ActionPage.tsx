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

type Route = keyof typeof routeStrategy;

const routeStrategy = {
  all: <ActionAll />,
  search: <ActionSearch />,
  expired: <ActionExpire />,
  executed: <ActionExecute />,
  archive: <ActionArchive />,
};

const renderActionPage = (route: Route | undefined) => {
  if (!route) return <Navigate to="/" replace />;
  if (route in routeStrategy) return routeStrategy[route];
  return <Navigate to="/" replace />;
};

const ActionPage = observer(() => {
  const { route } = useParams();

  useDocTitle("Reminded | 行動");
  useTutorial(TutorialType.action);

  return (
    <section className="relative">{renderActionPage(route as Route)}</section>
  );
});

export default ActionPage;
