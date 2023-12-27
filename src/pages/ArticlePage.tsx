import { Spinner } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";
import Article from "../components/Section/SectionNotes/Article";
import useDocTitle from "../hooks/useDocTitle";
import { Note } from "../models/Note";
import { cardStore } from "../store/cardStore";

const ArticlePage = observer(() => {
  const { id: noteId } = useParams();

  if (!noteId) return <Navigate to="/notes/all" />;
  const note = new Note(cardStore.getNoteWithId(noteId));

  useDocTitle(`Reminded | ${note.noteTitle}`);

  if (!note) return <Spinner />;
  return <Article note={note} />;
});

export default ArticlePage;
