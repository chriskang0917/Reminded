import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { observer } from "mobx-react-lite";
import React, { forwardRef, useState } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../components/Sidebar";

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 10];

const DndPocPage = observer(() => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [items1, setItems1] = useState(arr1);
  const [items2, setItems2] = useState(arr2);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("active", active);
    console.log("over", over);

    if (active.id !== over?.id) {
      setItems1((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over?.id as number);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Sidebar />
      <main className="ml-20 mt-10">
        <div className="px-auto mx-auto flex max-w-fit flex-col items-center">
          <h1>DND POC</h1>
          <h2>Items1</h2>
          <SortableContext
            items={items1}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex w-full flex-col gap-2">
              {items1.map((item) => (
                <li className="w-full bg-slate-400 text-center" key={item}>
                  <SortableItem item={item} />
                </li>
              ))}
            </ul>
          </SortableContext>
          <h2>Items2</h2>
          <SortableContext
            items={items2}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex w-full flex-col gap-2">
              {items2.map((item) => (
                <li className="w-full bg-slate-400 text-center" key={item}>
                  <SortableItem item={item} />
                </li>
              ))}
            </ul>
          </SortableContext>
          {activeId &&
            createPortal(
              <DragOverlay>
                <Item item={activeId} />
              </DragOverlay>,
              document.body,
            )}
        </div>
      </main>
    </DndContext>
  );
});

const Item = forwardRef(
  (
    { item, ...props }: { item: number },
    ref: React.LegacyRef<HTMLDivElement>,
  ) => {
    return (
      <div className="w-full bg-slate-400 text-center" {...props} ref={ref}>
        {item}
      </div>
    );
  },
);

const SortableItem = ({ item }: { item: number }) => {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({
      id: item,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="w-full bg-slate-400 text-center"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {item}
    </div>
  );
};

export default DndPocPage;
