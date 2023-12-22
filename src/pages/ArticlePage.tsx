import {
  Button,
  Card,
  Divider,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";
import CardTags from "../components/Card/CardTags";
import ModalEditor from "../components/Editor/ModalEditor";
import useDocTitle from "../hooks/useDocTitle";
import { useStopShortcut } from "../hooks/useStopShortcut";
import { cardStore } from "../store/cardStore";
import { Note } from "../utils/data";

const ArticlePage = observer(() => {
  const { id: noteId } = useParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  if (!noteId) return <Navigate to="/notes/all" />;
  const note = new Note(cardStore.getNoteWithId(noteId));

  useStopShortcut(isOpen);
  useDocTitle(`Reminded | ${note.noteTitle}`);

  if (!note) return <div>Loading...</div>;

  const renderNoteHeader = () => {
    return (
      <Card className="relative top-6 z-10 mx-auto mb-10 w-[95%] px-6 py-5">
        {note.tags.length === 0 && <CardTags card={note.details} />}
        <div className="flex items-center justify-between">
          <h1 className="my-4 text-2xl font-bold text-primary">
            {note.noteTitle}
          </h1>
          <Button
            color="secondary"
            size="sm"
            className="font-thin tracking-widest"
            onPress={() => onOpen()}
          >
            編輯
          </Button>
        </div>
        <span className="mb-3 text-sm text-third opacity-80">
          {note.createdTime}
        </span>
        <Divider />
        <Spacer y={1} />
        <div>{note.createdTime}</div>
      </Card>
    );
  };

  return (
    <section className="pb-5">
      {renderNoteHeader()}
      <ModalEditor
        pageTitle="編輯筆記"
        card={note.details}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </section>
  );
});

export default ArticlePage;
