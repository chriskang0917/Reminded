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
import { ICard, NewNote, cardStatus, cardStore } from "../../store/cardStore";
import { cardUtils } from "../../utils/cardUtils";
import { ActionCard, IdeaCard, TodoCard } from "../Card";

interface DndContextProps {
  children: React.ReactNode;
}

const actionToTodoTomorrow = (activeCard: ICard) => {
  const cardOrderList = cardStore.cardOrderList;
  const activeCardIndex = cardOrderList.indexOf(activeCard.id);
  const tomorrow = cardUtils.generateTomorrowDate().toISOString();
  cardStore.updateCard(activeCard.id, { dueDate: tomorrow });
  cardStore.updateCardToFirebase(activeCard.id, { dueDate: tomorrow });

  const movedArray = arrayMove(cardOrderList, activeCardIndex, activeCardIndex);
  cardStore.updateCardOrderList(movedArray);
  cardStore.updateCardOrderListToFirebase(movedArray);
};

const todoTomorrowToAction = (activeCard: ICard) => {
  const cardOrderList = cardStore.cardOrderList;
  const activeCardIndex = cardOrderList.indexOf(activeCard.id);
  cardStore.updateCard(activeCard.id, { status: "action", dueDate: null });
  cardStore.updateCardToFirebase(activeCard.id, {
    status: "action",
    dueDate: null,
  });

  const movedArray = arrayMove(cardOrderList, activeCardIndex, activeCardIndex);
  cardStore.updateCardOrderList(movedArray);
  cardStore.updateCardOrderListToFirebase(movedArray);
};

const defaultSwitch = (
  activeCard: ICard | NewNote,
  overCard: ICard | NewNote,
) => {
  const cardOrderList = cardStore.cardOrderList;
  const activeCardIndex = cardOrderList.indexOf(activeCard.id);
  const overCardIndex = cardOrderList.indexOf(overCard?.id);

  const movedArray = arrayMove(cardOrderList, activeCardIndex, overCardIndex);
  cardStore.updateCardOrderList(movedArray);
  cardStore.updateCardOrderListToFirebase(movedArray);
};

const switchStrategy = {
  action_to_todo_tomorrow: actionToTodoTomorrow,
  todo_tomorrow_to_action: todoTomorrowToAction,
  default: defaultSwitch,
};

export const DndProvider = ({ children }: DndContextProps) => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
        delay: 1000,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
        delay: 5000,
        tolerance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCard(event.active.data.current?.card ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCard(null);
    if (!over) return;

    const overId = over.id;
    const overCard = over.data.current?.card;
    const activeCard = active.data.current?.card;

    const isOverTodoTomorrow = overId === "todo_tomorrow_section";
    const isOverActionCard = overCard?.status === "action";
    const isOverTodoCard = overCard?.status === "todo";
    const hasActiveCardDueDate = activeCard?.dueDate;

    if (
      isOverTodoTomorrow ||
      ((isOverActionCard || isOverTodoCard) && !hasActiveCardDueDate)
    ) {
      return switchStrategy.action_to_todo_tomorrow(activeCard);
    }

    if (overId === "action_section" || isOverActionCard) {
      return switchStrategy.todo_tomorrow_to_action(activeCard);
    }

    if (activeCard.id === overCard?.id) return;

    return switchStrategy.default(activeCard, overCard);
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
