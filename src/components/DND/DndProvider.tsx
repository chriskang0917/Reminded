import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { ICard } from "../../store/cardStore";

interface DndContextProps {
  children: React.ReactNode;
}

export const DndProvider = ({ children }: DndContextProps) => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCard(event.active.data.current?.card ?? null);
    console.log(event.active.data.current?.card);
  };

  return <DndContext onDragStart={handleDragStart}>{children}</DndContext>;
};
