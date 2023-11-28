import { Checkbox } from "@nextui-org/react";
import { useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SlActionUndo } from "react-icons/sl";
import { ICard, cardStore } from "../../../store/cardStore";
import Editable from "../../Editable";
import BasicCard from "../BasicCard";
import CardTags from "../CardTags";
import { ActionCardTool } from "./ActionCardTool";

const settingList = [
  { icon: <CiCalendarDate />, label: "date" },
  { icon: <SlActionUndo className="h-3" />, label: "action" },
  { icon: <HiOutlineDotsVertical />, label: "more" },
];

interface CardToolProps {
  card: ICard;
}

export const ActionCard = ({ card }: CardToolProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setIsSelect] = useState(card.isArchived);

  const handleComplete = () => {
    setIsSelect(!isSelect);
    if (card.status === "execute") {
      cardStore.updateCard(card.id, {
        status: "action",
        isArchived: false,
      });
      cardStore.updateCardToFirebase(card.id, {
        status: "action",
        isArchived: false,
      });
      return;
    }
    if (card.status === "action") {
      cardStore.updateCard(card.id, {
        status: "execute",
        isArchived: true,
      });
      cardStore.updateCardToFirebase(card.id, {
        status: "execute",
        isArchived: true,
      });
    }
  };

  const isTodo = card.dueDate || card.status === "execute";

  return (
    <BasicCard>
      <div className="flex items-center justify-between">
        <div className="flex">
          {isTodo && (
            <Checkbox
              size="sm"
              radius="sm"
              name="checkbox"
              onValueChange={handleComplete}
              isSelected={isSelect}
              lineThrough
              defaultSelected
            ></Checkbox>
          )}
          <Editable
            id={card.id}
            text={card.content}
            placeholder="暫無內容..."
            childRef={inputRef}
            type="input"
          >
            <input
              className="inline-block w-[300px] bg-transparent tracking-wide outline-none"
              type="text"
              name={card.status}
              defaultValue={card.content}
              ref={inputRef}
            />
          </Editable>
        </div>
        <div className="relative flex items-center justify-end gap-6">
          {settingList.map((setting) => (
            <ActionCardTool key={setting.label} setting={setting} card={card} />
          ))}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2">
        <CardTags card={card} />
      </div>
    </BasicCard>
  );
};
