import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { ICard } from "../../../store/cardStore";
import NoteEditor from "../../Editor/NoteEditor";

interface IdeaNoteModalProp {
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export const IdeaNoteModal = ({
  card,
  isOpen,
  onOpenChange,
  onClose,
}: IdeaNoteModalProp) => {
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
              onPress={onClose}
            >
              記錄
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <NoteEditor card={card} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
