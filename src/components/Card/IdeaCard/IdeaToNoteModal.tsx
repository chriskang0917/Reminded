import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ICard, NewNote, cardStore } from "../../../store/cardStore";
import NoteEditor from "../../Editor/NoteEditor";

interface IdeaNoteModalProp {
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface NoteContent {
  title: string;
  description: string;
  noteHTML: string;
  tags: string[];
}

export const IdeaNoteModal = ({
  card,
  isOpen,
  onOpenChange,
  onClose,
}: IdeaNoteModalProp) => {
  const [noteContent, setNoteContent] = useState<NoteContent>({
    title: "",
    description: "",
    noteHTML: "",
    tags: [],
  });

  const handleNoteChange = (
    title: string,
    description: string,
    noteHTML: string,
    tags: string[],
  ) => {
    setNoteContent({ title, description, noteHTML, tags });
  };

  const handleSubmit = () => {
    const note = new NewNote(
      noteContent.title,
      noteContent.description,
      noteContent.noteHTML,
      card.tags,
    );
    cardStore.addCard(note);
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
          <h1 className="text-third tracking-wider">轉換你的靈感...</h1>
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
            onNoteChange={handleNoteChange}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
