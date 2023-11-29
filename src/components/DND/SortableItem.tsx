import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { ICard } from "../../store/cardStore";

interface SortableItemProps {
  card: ICard;
  children: React.ReactNode;
}

export const SortableItem = observer(
  ({ card, children }: SortableItemProps) => {
    const { setNodeRef, attributes, listeners, transform, transition } =
      useSortable({ id: card.id, data: { card: toJS(card) } });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  },
);
