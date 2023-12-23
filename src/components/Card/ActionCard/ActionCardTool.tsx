import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { parseISO } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { NewCard } from "../../../models/NewCard";
import { ICard, cardStore } from "../../../store/cardStore";
import DatePicker from "../DatePicker";

interface CardToolProps {
  setting: {
    label: string;
    icon: React.ReactNode;
  };
  card: ICard;
  onOpen?: () => void;
}

type color =
  | "default"
  | "warning"
  | "danger"
  | "primary"
  | "secondary"
  | "success"
  | undefined;

interface IList {
  label: string;
  color: color;
  onPress?: () => void;
}

export const ActionCardTool = observer(({ card, setting }: CardToolProps) => {
  const parsedDate = card.dueDate ? parseISO(card.dueDate) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(parsedDate);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const dueDate = date?.toISOString() || null;
    cardStore.updateCard(card.id, { dueDate });
    cardStore.updateCardToFirebase(card.id, { dueDate });
  };

  const handleDuplicate = () => {
    const duplicateText = `${card.content} copy`;
    const newCard = new NewCard(duplicateText, card.tags, card.status);
    cardStore.addCard(newCard);
    cardStore.addCardToFireStore(newCard);
  };

  const handleArchive = () => {
    cardStore.updateCard(card.id, { isArchived: true });
    cardStore.updateCardToFirebase(card.id, { isArchived: true });
  };

  const handleDelete = () => {
    cardStore.deleteCard(card.id);
    cardStore.deleteCardFromFireStore(card.id);
  };

  const menuList: IList[] = [
    { label: "複製", color: "default", onPress: handleDuplicate },
    { label: "封存", color: "danger", onPress: handleArchive },
    { label: "刪除", color: "danger", onPress: handleDelete },
  ];

  const hasDateLabel = setting.label === "date";
  const hasMoreLabel = setting.label === "more";

  const renderDatePickerWithoutDate = () => {
    return (
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
      >
        <PopoverTrigger>
          <button>{setting.icon}</button>
        </PopoverTrigger>
        <PopoverContent>
          {!selectedDate && (
            <DatePicker
              card={card}
              date={selectedDate}
              setDate={handleDateChange}
              onClose={() => setIsOpen(false)}
            />
          )}
        </PopoverContent>
      </Popover>
    );
  };

  const renderSettingDropdown = () => {
    return (
      <div className="w-4">
        <Dropdown key={setting.label} backdrop="opaque">
          <DropdownTrigger>
            <button>{setting.icon}</button>
          </DropdownTrigger>
          {setting.label === "more" && (
            <DropdownMenu aria-label="Setting">
              {menuList.map((menu) => (
                <DropdownItem
                  textValue={menu.label || ""}
                  key={menu.label}
                  color={menu.color}
                  onPress={menu.onPress}
                >
                  {menu.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </div>
    );
  };

  return (
    <>
      {hasDateLabel && renderDatePickerWithoutDate()}
      {hasMoreLabel && renderSettingDropdown()}
    </>
  );
});
