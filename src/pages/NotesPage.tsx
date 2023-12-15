import { Navigate, useParams } from "react-router-dom";
import { NoteSearch, NotesAll } from "../components/Section/SectionNotes";
import useDocTitle from "../hooks/useDocTitle";

const renderIdeaPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <NotesAll />;
    case "search":
      return <NoteSearch />;
    default:
      return <Navigate to="/" replace />;
  }
};

function NotesPage() {
  const { route } = useParams();
  useDocTitle("Reminded | 筆記");
  return <section className="relative">{renderIdeaPage(route)}</section>;
}

export default NotesPage;
