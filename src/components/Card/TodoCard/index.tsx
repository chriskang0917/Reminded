import { useRef } from "react";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiNoteBlankThin } from "react-icons/pi";
import { ICard } from "../../../store/cardStore";
import Editable from "../../Editable";
import BasicCard from "../BasicCard";
import CardTags from "../CardTags";

const settingIcons = [
  { icon: <PiNoteBlankThin />, label: "note" },
  { icon: <GrTransaction className="h-3" />, label: "action" },
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
            className="inline-block w-full bg-transparent tracking-wide outline-none"
            type="text"
            name={card.status}
            defaultValue={card.content}
            ref={inputRef}
          />
        </Editable>
        <div className="flex w-24 items-center justify-between">
          {/* {settingIcons.map((setting) => (
            <CardTool
              key={setting.label}
              card={card}
              setting={setting}
              onOpen={onOpen}
            />
          ))}
          <IdeaToActionModal
            card={card}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          /> */}
        </div>
      </div>
      <div className="mt-2 flex w-[500px] flex-wrap items-center gap-x-2">
        <CardTags card={card} />
      </div>
    </BasicCard>
  );
};
