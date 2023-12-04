import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import toast from "react-hot-toast";
import { ICard, NewNote, cardStore } from "../../store/cardStore";
import NoteEditor from "./NoteEditor";

interface ModalEditorProp {
  pageTitle?: string;
  contentHTML?: string;
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface NoteContent {
  noteTitle: string;
  description: string;
  noteHTML: string;
  tags: string[];
}

const ModalEditor = observer((prop: ModalEditorProp) => {
  const { pageTitle, contentHTML, card, isOpen, onOpenChange, onClose } = prop;

  const [noteContent, setNoteContent] = useState<NoteContent>({
    noteTitle: "",
    description: "",
    noteHTML: "",
    tags: [],
  });

  const handleNoteChange = (
    noteTitle: string,
    description: string,
    noteHTML: string,
    tags: string[],
  ) => {
    setNoteContent({ noteTitle, description, noteHTML, tags });
  };

  const handleSubmit = () => {
    const note = new NewNote(
      noteContent.noteTitle,
      noteContent.description,
      noteContent.noteHTML,
      card.tags,
    );
    cardStore.addNote(note);
    cardStore.addNoteToFireStore(note);
    toast.success("已新增筆記");
    onClose();
  };

  return (
    <Modal
      className="mx-10 max-w-[600px] p-4"
      backdrop="blur"
      hideCloseButton
      isKeyboardDismissDisabled
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between">
          <h1 className="tracking-wider text-third">
            {pageTitle ? pageTitle : "編輯你的筆記"}
          </h1>
          <div className="flex gap-2">
            <Button
              className="min-w-[40px] tracking-wider"
              radius="sm"
              variant="light"
              color="danger"
              onPress={onClose}
            >
              關閉
            </Button>
            <Button
              className="min-w-[40px] tracking-wider"
              radius="sm"
              color="primary"
              variant="shadow"
              onPress={handleSubmit}
            >
              記錄
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <NoteEditor
            card={card}
            onClose={onClose}
            contentHTML={contentHTML}
            onNoteChange={handleNoteChange}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default ModalEditor;
