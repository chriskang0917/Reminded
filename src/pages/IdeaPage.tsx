import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";
import {
  IdeaAction,
  IdeaAll,
  IdeaArchive,
  IdeaSearch,
  IdeaWeek,
} from "../components/Section/SectionIdea";
import useDocTitle from "../hooks/useDocTitle";
import useTutorial from "../hooks/useTutorial";
import { TutorialType } from "../utils/tutorial";

type Route = keyof typeof routeStrategy;

const routeStrategy = {
  week: <IdeaWeek />,
  search: <IdeaSearch />,
  pools: <IdeaAll />,
  action: <IdeaAction />,
  archive: <IdeaArchive />,
};

const renderIdeaPage = (route: Route | undefined) => {
  if (!route) return <Navigate to="/" replace />;
  if (route in routeStrategy) return routeStrategy[route];
  return <Navigate to="/" replace />;
};

const IdeaPage = observer(() => {
  const { route } = useParams();

  useDocTitle("Reminded | 靈感");
  useTutorial(TutorialType.idea);

  return (
    <section className="relative">{renderIdeaPage(route as Route)}</section>
  );
});

export default IdeaPage;
