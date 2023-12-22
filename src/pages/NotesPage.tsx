import { Navigate, useParams } from "react-router-dom";
import { NoteSearch, NotesAll } from "../components/Section/SectionNotes";
import useDocTitle from "../hooks/useDocTitle";

type Route = keyof typeof routeStrategy;

const routeStrategy = {
  all: <NotesAll />,
  search: <NoteSearch />,
};

const renderIdeaPage = (route: Route | undefined) => {
  if (!route) return <Navigate to="/" replace />;
  if (route in routeStrategy) return routeStrategy[route];
  return <Navigate to="/" replace />;
};

function NotesPage() {
  const { route } = useParams();
  useDocTitle("Reminded | 筆記");
  return (
    <section className="relative">{renderIdeaPage(route as Route)}</section>
  );
}

export default NotesPage;
