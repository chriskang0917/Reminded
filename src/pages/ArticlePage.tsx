import {
  Button,
  Card,
  Divider,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import parse from "html-react-parser";
import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";
import CardTags from "../components/Card/CardTags";
import ModalEditor from "../components/Editor/ModalEditor";
import useDocTitle from "../hooks/useDocTitle";
import { useStopShortcut } from "../hooks/useStopShortcut";
import { cardStore } from "../store/cardStore";

const ArticlePage = observer(() => {
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useStopShortcut(isOpen);

  if (!id) return <Navigate to="/notes/all" />;

  const note = cardStore.getNoteWithId(id);

  if (!note) return <div>Loading...</div>;

  const title = note.noteTitle;
  const noteHTML = note.noteHTML || "";
  const parsedHTML = parse(noteHTML);
  const parsedDate = parseISO(note.createdTime);
  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  useDocTitle(`Reminded | ${title}`);

  const handleEdit = () => onOpen();

  return (
    <section className="pb-5">
      <Card className="relative top-6 z-10 mx-auto mb-10 w-[95%] px-6 py-5">
        {note.tags.length ? <CardTags card={note} /> : ""}
        <div className="flex items-center justify-between">
          <h1 className="my-4 text-2xl font-bold text-primary">{title}</h1>
          <Button
            color="secondary"
            size="sm"
            className="font-thin tracking-widest"
            onPress={handleEdit}
          >
            編輯
          </Button>
        </div>
        <span className="mb-3 text-sm text-third opacity-80">
          {formattedDate}
        </span>
        <Divider />
        <Spacer y={1} />
        <div>{parsedHTML}</div>
      </Card>
      <ModalEditor
        pageTitle="編輯筆記"
        card={note}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </section>
  );
});

export default ArticlePage;
