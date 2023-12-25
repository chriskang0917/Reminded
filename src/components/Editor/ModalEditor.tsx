import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { NewNote } from "../../models/NewNote";
import { cardStore } from "../../store/cardStore";
import { uiStore } from "../../store/uiStore";
import NoteEditor from "./NoteEditor";

interface ModalEditorProp {
  pageTitle?: string;
  card?: NewNote;
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
  const { pageTitle, card, isOpen, onOpenChange, onClose } = prop;
  const navigate = useNavigate();

  const [noteContent, setNoteContent] = useState<NoteContent>({
    noteTitle: card?.noteTitle || "",
    description: card?.content || "",
    noteHTML: card?.noteHTML || "",
    tags: card?.tags || [],
  });

  const handleNoteChange = (
    noteTitle: string,
    description: string,
    noteHTML: string,
    tags: string[],
  ) => {
    setNoteContent({ noteTitle, description, noteHTML, tags });
  };

  const handleDeleteNote = () => {
    cardStore.deleteCard(card?.id as string);
    cardStore.deleteCardFromFireStore(card?.id as string);
    uiStore.stopInputEditing();
    toast.success("已刪除筆記");
    onClose();
    navigate("/notes/all");
  };

  const handleSubmit = () => {
    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    if (!noteContent.noteTitle) return toast.error("請輸入筆記標題");

    if (card?.id && card?.noteTitle) {
      cardStore.updateNote(card.id, {
        noteTitle: noteContent.noteTitle || `未命名筆記 ${now}`,
        content: noteContent.description || "尚無內容",
        noteHTML: noteContent.noteHTML,
        tags: noteContent.tags,
      });
      cardStore.updateNoteToFirebase(card.id, {
        noteTitle: noteContent.noteTitle || "未命名筆記 ${now}",
        content: noteContent.description || "尚無內容",
        noteHTML: noteContent.noteHTML || "",
        tags: noteContent.tags,
      });
      toast.success("已更新筆記");
      onClose();
      return;
    }

    const note = new NewNote(
      noteContent.noteTitle || `未命名筆記 ${now}`,
      noteContent.description || `尚無內容`,
      noteContent.noteHTML || "",
      card?.tags || [],
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
          <div className="flex items-center gap-2">
            {card ? (
              <Button
                className="min-w-3 px-3 tracking-wider"
                color="danger"
                variant="shadow"
                radius="sm"
                onPress={handleDeleteNote}
              >
                刪除
              </Button>
            ) : (
              <h1 className="tracking-wider text-third">
                {pageTitle ? pageTitle : "編輯你的筆記"}
              </h1>
            )}
          </div>
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
            card={card as NewNote}
            onClose={onClose}
            onNoteChange={handleNoteChange}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default ModalEditor;
