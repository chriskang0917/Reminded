import { useRef } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SlActionUndo } from "react-icons/sl";
import { ICard } from "../../../store/cardStore";
import Editable from "../../Editable";
import BasicCard from "../BasicCard";
import CardTags from "../CardTags";
import { TodoCardTool } from "./TodoCardTool";

const settingList = [
  { icon: <CiCalendarDate />, label: "date" },
  { icon: <SlActionUndo className="h-3" />, label: "action" },
  { icon: <HiOutlineDotsVertical />, label: "more" },
];

interface CardToolProps {
  card: ICard;
}

export const TodoCard = ({ card }: CardToolProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <BasicCard>
      <div className="flex items-center justify-between">
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
        <div className="relative flex items-center justify-end gap-6">
          {settingList.map((setting) => (
            <TodoCardTool key={setting.label} setting={setting} card={card} />
          ))}
        </div>
      </div>
      <div className="mt-2 flex w-[500px] flex-wrap items-center gap-x-2">
        <CardTags card={card} />
      </div>
    </BasicCard>
  );
};
