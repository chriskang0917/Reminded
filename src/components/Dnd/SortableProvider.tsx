import { SortableContext } from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
import { AllCards, cardStore } from "../../store/cardStore";

interface SortableListProps {
  children: React.ReactNode;
}

export const SortableProvider = observer(({ children }: SortableListProps) => {
  const cards = cardStore.getFilteredCardsWith(new AllCards());
  return <SortableContext items={cards}>{children}</SortableContext>;
});
