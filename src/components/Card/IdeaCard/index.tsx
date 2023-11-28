import { useDisclosure } from "@nextui-org/react";
import { useRef } from "react";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiNoteBlankThin } from "react-icons/pi";
import { ICard } from "../../../store/cardStore";
import Editable from "../../Editable";
import BasicCard from "../BasicCard";
import CardTags from "../CardTags";
import CardTool from "./IdeaCardTool";
import { IdeaToActionModal } from "./IdeaToActionModal";

const settingIcons = [
  { icon: <PiNoteBlankThin />, label: "note" },
  { icon: <GrTransaction className="h-3" />, label: "action" },
  { icon: <HiOutlineDotsVertical />, label: "more" },
];

export const IdeaCard = ({ card }: { card: ICard }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
          {settingIcons.map((setting) => (
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
          />
        </div>
      </div>
      <div className="mt-5 flex max-w-[500px] flex-wrap items-center gap-x-2">
        <CardTags card={card} />
      </div>
    </BasicCard>
  );
};
