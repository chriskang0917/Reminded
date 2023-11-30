import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ICard, cardStatus, cardStore } from "../../store/cardStore";
import { ActionCard, IdeaCard, TodoCard } from "../Card";

interface DndContextProps {
  children: React.ReactNode;
}

export const DndProvider = ({ children }: DndContextProps) => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 50,
        delay: 1000,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
        delay: 1000,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCard(event.active.data.current?.card ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCard(null);
    if (!over) return;

    const activeCard = active.data.current?.card;
    const overCard = over.data.current?.card;

    if (activeCard.id === overCard.id) return;
    if (activeCard.status !== overCard.status) return;

    const cardOrderList = cardStore.cardOrderList;
    const activeCardIndex = cardOrderList.indexOf(activeCard.id);
    const overCardIndex = cardOrderList.indexOf(overCard.id);

    const movedArray = arrayMove(cardOrderList, activeCardIndex, overCardIndex);
    cardStore.updateCardOrderList(movedArray);
    cardStore.updateCardOrderListToFirebase(movedArray);
  };

  const getCardType = (cardStatus: cardStatus) => {
    if (!activeCard) return;
    switch (cardStatus) {
      case "todo":
        return <TodoCard card={activeCard} />;
      case "idea":
        return <IdeaCard card={activeCard} />;
      case "action":
        return <ActionCard card={activeCard} />;
      default:
        return "";
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      {createPortal(
        <DragOverlay>
          {activeCard && getCardType(activeCard.status)}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
