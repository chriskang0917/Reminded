import { ICard, NewNote } from "../../../store/cardStore";
import ModalEditor from "../../Editor/ModalEditor";

interface IdeaNoteModalProp {
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export const IdeaNoteModal = (prop: IdeaNoteModalProp) => {
  const { card, isOpen, onOpenChange, onClose } = prop;

  const pageTitle = "轉換你的靈感...";

  return (
    <ModalEditor
      pageTitle={pageTitle}
      card={card as NewNote}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
    />
  );
};
