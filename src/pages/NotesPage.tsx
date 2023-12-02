import { useParams } from "react-router-dom";
import { NotesAll } from "../components/SectionNotes";
import ErrorPage from "./ErrorPage";

const renderIdeaPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <NotesAll />;
    case "search":
      return <div>Search</div>;
    default:
      return <ErrorPage />;
  }
};

function NotesPage() {
  const { route } = useParams();
  return <section className="relative z-50">{renderIdeaPage(route)}</section>;
}

export default NotesPage;
