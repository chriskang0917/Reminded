import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ICard, cardStatus, cardStore } from "../../store/cardStore";
import { cardUtils } from "../../utils/cardUtils";
import { ActionCard, IdeaCard, TodoCard } from "../Card";

interface DndContextProps {
  children: React.ReactNode;
}

const moveCard = (activeCard: ICard, overCard: ICard) => {
  const cardOrderList = cardStore.cardOrderList;
  const activeCardIndex = cardOrderList.indexOf(activeCard.id);
  const overCardIndex = cardOrderList.indexOf(overCard.id);

  const movedArray = arrayMove(cardOrderList, activeCardIndex, overCardIndex);
  cardStore.updateCardOrderList(movedArray);
  cardStore.updateCardOrderListToFirebase(movedArray);
};

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

const switchStrategy = {
  action_to_todo_tomorrow: actionToTodoTomorrow,
  todo_tomorrow_to_action: todoTomorrowToAction,
  default: moveCard,
};

const shouldSwitchActionToTodo = (
  overId: UniqueIdentifier,
  activeCard: ICard,
  overCard: ICard,
) => {
  const isOverTomorrowSection = overId === "todo_tomorrow_section";
  const isOverActionCard = overCard?.status === "action";
  const isOverTodoCard = overCard?.status === "todo";
  const hasActiveCardDueDate = activeCard?.dueDate;
  const isOverTodoTomorrowCard = overCard?.dueDate;

  return (
    isOverTomorrowSection ||
    ((isOverActionCard || isOverTodoCard) &&
      !hasActiveCardDueDate &&
      isOverTodoTomorrowCard)
  );
};

const shouldSwitchTodoToAction = (
  overId: UniqueIdentifier,
  activeCard: ICard,
  overCard: ICard,
) => {
  const isOverActionSection = overId === "action_section";
  const isOverActionCard = overCard?.status === "action";
  return (
    (isOverActionCard && activeCard?.dueDate && !overCard?.dueDate) ||
    isOverActionSection
  );
};

export const DndProvider = ({ children }: DndContextProps) => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 30,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 700,
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

    if (shouldSwitchActionToTodo(overId, activeCard, overCard)) {
      return switchStrategy.action_to_todo_tomorrow(activeCard);
    }
    if (shouldSwitchTodoToAction(overId, activeCard, overCard)) {
      return switchStrategy.todo_tomorrow_to_action(activeCard);
    }

    if (activeCard?.id === overCard?.id) return;
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
      collisionDetection={closestCenter}
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
