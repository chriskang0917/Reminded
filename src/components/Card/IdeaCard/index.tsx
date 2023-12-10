import { useDisclosure } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiNoteBlankThin } from "react-icons/pi";
import { ICard } from "../../../store/cardStore";
import { uiStore } from "../../../store/uiStore";
import Editable from "../../Editable";
import BasicCard from "../BasicCard";
import CardTags from "../CardTags";
import IdeaCardTool from "./IdeaCardTool";
import { IdeaToActionModal } from "./IdeaToActionModal";
import { IdeaNoteModal } from "./IdeaToNoteModal";

export const IdeaCard = ({ card }: { card: ICard }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isOpenAction,
    onOpen: onOpenAction,
    onOpenChange: onOpenChangeAction,
    onClose: onCloseAction,
  } = useDisclosure();
  const {
    isOpen: isOpenNote,
    onOpen: onOpenNote,
    onOpenChange: onOpenChangeNote,
    onClose: onCloseNote,
  } = useDisclosure();

  useEffect(() => {
    if (isOpenNote || isOpenAction) return uiStore.disableDnd();
    uiStore.enableDnd();
  }, [isOpenNote, isOpenAction]);

  const settingList = [
    {
      icon: <PiNoteBlankThin />,
      label: "note",
      id: "tutorial-ideas-4",
      onClick: onOpenNote,
    },
    {
      icon: <GrTransaction className="h-3" />,
      label: "action",
      id: "tutorial-ideas-2",
      onClick: onOpenAction,
    },
    { icon: <HiOutlineDotsVertical />, label: "more", onClick: () => {} },
  ];

  return (
    <BasicCard card={card}>
      <div className="flex flex-grow items-center justify-between">
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
        <ul className="ml-2 flex min-w-unit-24 items-center justify-between">
          {settingList.map((setting) => (
            <li id={setting.id} key={setting.label}>
              <IdeaCardTool card={card} setting={setting} />
            </li>
          ))}
          <IdeaToActionModal
            card={card}
            isOpen={isOpenAction}
            onOpenChange={onOpenChangeAction}
            onClose={onCloseAction}
          />
          <IdeaNoteModal
            card={card}
            isOpen={isOpenNote}
            onOpenChange={onOpenChangeNote}
            onClose={onCloseNote}
          />
        </ul>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-2">
        <CardTags card={card} />
      </div>
    </BasicCard>
  );
};
