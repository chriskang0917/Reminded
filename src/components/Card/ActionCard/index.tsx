import { Checkbox, useDisclosure } from "@nextui-org/react";
import { useRef, useState } from "react";
import { ICard, cardStore } from "../../../store/cardStore";
import BasicCard from "../BasicCard";
import Editable from "../Editable/Editable";
import EditableWrapper from "../Editable/EditableWrapper";
import { IdeaNoteModal } from "../IdeaCard/IdeaToNoteModal";
import { ActionCardTool } from "./ActionCardTool";
import { CalendarIcon } from "../Icons/CalendarIcon";
import { MenuIcon } from "../Icons/MenuIcon";

const settingList = [
  { icon: <CalendarIcon />, label: "date", id: "tutorial-actions-1" },
  { icon: <MenuIcon />, label: "more" },
];

export const ActionCard = ({ card }: { card: ICard }) => {
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

  const renderSettingDropdown = () => {
    return (
      <ul className="ml-2 flex min-w-unit-24 items-center justify-end gap-5">
        {settingList.map((setting) => (
          <li id={setting.id} key={setting.label}>
            <ActionCardTool setting={setting} onOpen={onOpenNote} card={card} />
          </li>
        ))}
      </ul>
    );
  };

  const renderNoteModal = () => {
    return (
      <IdeaNoteModal
        card={card}
        isOpen={isOpenNote}
        onOpenChange={onOpenChangeNote}
        onClose={onCloseNote}
      />
    );
  };

  const isTodo = card.dueDate || card.status === "execute";

  return (
    <>
      <BasicCard card={card}>
        <EditableWrapper>
          {isTodo && renderCheckbox()}
          {renderCardEditable()}
          {renderSettingDropdown()}
        </EditableWrapper>
      </BasicCard>
      {renderNoteModal()}
    </>
  );
};
