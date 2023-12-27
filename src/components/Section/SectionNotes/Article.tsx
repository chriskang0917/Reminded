import {
  Button,
  Card,
  Divider,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { useStopShortcut } from "../../../hooks/useStopShortcut";
import { Note } from "../../../models/Note";
import CardTags from "../../Card/CardTags";
import ModalEditor from "../../Editor/ModalEditor";

interface ArticleProps {
  note: Note;
}

function Article({ note }: ArticleProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  useStopShortcut(isOpen);

  const renderNoteHeader = () => {
    return (
      <Card className="relative z-10 mx-auto mb-10 mt-10 w-[95%] px-6 py-5 md:top-6">
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
        <div>{note.parsedNoteHTML}</div>
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
}

export default Article;
