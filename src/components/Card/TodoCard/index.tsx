import { Checkbox } from "@nextui-org/react";
import { useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ICard, cardStore } from "../../../store/cardStore";
import BasicCard from "../BasicCard";
import Editable from "../Editable/Editable";
import EditableWrapper from "../Editable/EditableWrapper";
import { TodoCardTool } from "./TodoCardTool";

const settingList = [
  { icon: <CiCalendarDate />, label: "date" },
  { icon: <GrTransaction className="h-3" />, label: "action" },
  { icon: <HiOutlineDotsVertical />, label: "more" },
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

  return (
    <BasicCard card={card}>
      <EditableWrapper>
        {card.dueDate && (
          <Checkbox
            size="sm"
            radius="sm"
            name="checkbox"
            onValueChange={handleComplete}
            isSelected={isSelect}
            lineThrough
            defaultSelected
          />
        )}
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
        <div className="ml-2 flex min-w-unit-24 items-center justify-between">
          {settingList.map((setting) => (
            <TodoCardTool key={setting.label} setting={setting} card={card} />
          ))}
        </div>
      </EditableWrapper>
    </BasicCard>
  );
};
