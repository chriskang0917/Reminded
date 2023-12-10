import { Checkbox, useDisclosure } from "@nextui-org/react";
import { useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SlActionUndo } from "react-icons/sl";
import { ICard, cardStore } from "../../../store/cardStore";
import Editable from "../../Editable";
import BasicCard from "../BasicCard";
import CardTags from "../CardTags";
import { IdeaNoteModal } from "../IdeaCard/IdeaToNoteModal";
import { ActionCardTool } from "./ActionCardTool";

const settingList = [
  { icon: <CiCalendarDate />, label: "date", id: "tutorial-actions-1" },
  { icon: <SlActionUndo className="h-3" />, label: "action" },
  { icon: <HiOutlineDotsVertical />, label: "more" },
];

interface CardToolProps {
  card: ICard;
}

export const ActionCard = ({ card }: CardToolProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setIsSelect] = useState(card.isArchived);
  const {
    isOpen: isOpenNote,
    onOpen: onOpenNote,
    onOpenChange: onOpenChangeNote,
    onClose: onCloseNote,
  } = useDisclosure();

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
    <BasicCard card={card}>
      <div className="flex flex-grow items-center justify-between">
        <div className="flex flex-grow items-center justify-between">
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
              className="inline-block bg-transparent tracking-wide outline-none"
              type="text"
              name={card.status}
              defaultValue={card.content}
              ref={inputRef}
            />
          </Editable>
        </div>
        <ul className="ml-2 flex min-w-unit-24 items-center justify-between">
          {settingList.map((setting) => (
            <li id={setting.id} key={setting.label}>
              <ActionCardTool
                setting={setting}
                onOpen={onOpenNote}
                card={card}
              />
            </li>
          ))}
        </ul>
        <IdeaNoteModal
          card={card}
          isOpen={isOpenNote}
          onOpenChange={onOpenChangeNote}
          onClose={onCloseNote}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2">
        <CardTags card={card} />
      </div>
    </BasicCard>
  );
};
