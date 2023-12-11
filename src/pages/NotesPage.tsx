import { useParams } from "react-router-dom";
import { NoteSearch, NotesAll } from "../components/Section/SectionNotes";
import ErrorPage from "./ErrorPage";

const renderIdeaPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <NotesAll />;
    case "search":
      return <NoteSearch />;
    default:
      return <ErrorPage />;
  }
};

function NotesPage() {
  const { route } = useParams();
  return <section className="relative">{renderIdeaPage(route)}</section>;
}

export default NotesPage;
