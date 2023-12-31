import { Checkbox, cn } from "@nextui-org/react";
import { useRef, useState } from "react";
import { ICard, cardStore } from "../../../store/cardStore";
import BasicCard from "../BasicCard";
import Editable from "../Editable/Editable";
import EditableWrapper from "../Editable/EditableWrapper";
import { ActionIcon } from "../Icons/ActionIcon";
import { CalendarIcon } from "../Icons/CalendarIcon";
import { MenuIcon } from "../Icons/MenuIcon";
import { TodoCardTool } from "./TodoCardTool";

const settingList = [
  { icon: <CalendarIcon />, label: "date" },
  { icon: <ActionIcon />, label: "action" },
  { icon: <MenuIcon className="h-5 w-5 translate-y-[2px]" />, label: "more" },
];

interface CardToolProps {
  card: ICard;
}

export const TodoCard = ({ card }: CardToolProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setIsSelect] = useState(card.isArchived);

  const handleComplete = () => {
    setIsSelect(!isSelect);
    if (card.status === "action") {
      cardStore.updateCard(card.id, {
        status: "execute",
        isArchived: true,
      });
      cardStore.updateCardToFirebase(card.id, {
        status: "execute",
        isArchived: true,
      });
      return;
    }
    cardStore.updateCard(card.id, { isArchived: !isSelect });
    cardStore.updateCardToFirebase(card.id, { isArchived: !isSelect });
  };

  const renderCheckbox = () => {
    return (
      <Checkbox
        size="sm"
        radius="sm"
        name="checkbox"
        onValueChange={handleComplete}
        isSelected={isSelect}
        lineThrough
        defaultSelected
      />
    );
  };

  const renderCardEditable = () => {
    return (
      <Editable
        id={card.id}
        text={card.content}
        placeholder="暫無內容..."
        childRef={inputRef}
        type="input"
      >
        <input
          className="inline-block w-full bg-transparent tracking-wide outline-none"
          type="text"
          name={card.status}
          defaultValue={card.content}
          ref={inputRef}
        />
      </Editable>
    );
  };

  const renderCardTools = () => {
    return (
      <div
        className={cn(
          "ml-2 flex items-center justify-between",
          card.dueDate ? "min-w-unit-24" : "min-w-[74px]",
        )}
      >
        {settingList.map((setting) => (
          <TodoCardTool key={setting.label} setting={setting} card={card} />
        ))}
      </div>
    );
  };

  return (
    <BasicCard card={card}>
      <EditableWrapper>
        {renderCheckbox()}
        {renderCardEditable()}
        {renderCardTools()}
      </EditableWrapper>
    </BasicCard>
  );
};
