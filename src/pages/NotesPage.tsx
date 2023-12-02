import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const renderIdeaPage = (route: string | undefined) => {
  switch (route) {
    case "all":
      return <div>Notes</div>;
    default:
      return <ErrorPage />;
  }
};

function NotesPage() {
  const { route } = useParams();
  return <section>{renderIdeaPage(route)}</section>;
}

export default NotesPage;
