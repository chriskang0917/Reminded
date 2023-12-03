import parse from "html-react-parser";
import { Navigate, useParams } from "react-router-dom";
import { cardStore } from "../store/cardStore";

function ArticlePage() {
  const { id } = useParams();

  if (!id) return <Navigate to="/notes/all" />;

  const note = cardStore.getNoteWithId(id);
  const title = note.noteTitle;
  const noteHTML = note.noteHTML;
  const parsedHTML = parse(noteHTML);

  return (
    <section className="relative">
      <h1>{title}</h1>
      {parsedHTML}
    </section>
  );
}

export default ArticlePage;
