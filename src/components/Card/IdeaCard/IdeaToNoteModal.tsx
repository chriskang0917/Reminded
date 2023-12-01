import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
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
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader>轉換你的筆記...</ModalHeader>
        <ModalBody>
          <NoteEditor card={card} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
