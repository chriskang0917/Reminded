import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import {
  ICard,
  NewCard,
  cardStatus,
  cardStore,
} from "../../../store/cardStore";
import DatePicker from "../DatePicker";

interface CardToolProps {
  setting: {
    label: string;
    icon: React.ReactNode;
  };
  card: ICard;
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

export const TodoCardTool = observer(({ card, setting }: CardToolProps) => {
  const parsedDate = card.dueDate ? parseISO(card.dueDate) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(parsedDate);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const dueDate = date?.toISOString() || null;
    cardStore.updateCard(card.id, { dueDate });
    cardStore.updateCardToFirebase(card.id, { dueDate });
  };

  const handleDuplicate = () => {
    const newCard = new NewCard(card.content, card.tags, card.status);
    cardStore.addCard(newCard);
    cardStore.addCardToFireStore(newCard);
  };

  const handleDelete = () => {
    cardStore.deleteCard(card.id);
  };

  const handleUpdateStatus = (status: cardStatus) => {
    cardStore.updateCard(card.id, { status });
    cardStore.updateCardToFirebase(card.id, { status });
  };

  const menuList: IList[] = [
    { label: "複製", color: "default", onPress: handleDuplicate },
    { label: "刪除", color: "danger", onPress: handleDelete },
  ];

  const actionList: IList[] = [
    {
      label: "行動",
      color: "default",
      onPress: () => handleUpdateStatus("action"),
    },
    {
      label: "靈感",
      color: "default",
      onPress: () => handleUpdateStatus("idea"),
    },
    {
      label: "筆記",
      color: "success",
      onPress: () => handleUpdateStatus("note"),
    },
  ];

  const formatDate = (date: Date | undefined) => {
    if (!date) return;
    return format(date, "MMM dd");
  };

  const isDateLabel = setting.label === "date";
  const isActionLabel = setting.label === "action";
  const isMoreLabel = setting.label === "more";

  return (
    <>
      {isDateLabel && selectedDate && (
        <Popover placement="bottom">
          <PopoverTrigger>
            <button>
              <p className="text-[0.75rem] underline">
                {formatDate(selectedDate)}
              </p>
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <DatePicker
              card={card}
              date={selectedDate.toDateString()}
              setDate={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      )}
      {isDateLabel && !selectedDate && (
        <Popover placement="bottom">
          <PopoverTrigger>
            <button>{setting.icon}</button>
          </PopoverTrigger>
          <PopoverContent>
            {!selectedDate && (
              <DatePicker
                card={card}
                date={selectedDate}
                setDate={handleDateChange}
              />
            )}
          </PopoverContent>
        </Popover>
      )}
      {isActionLabel && (
        <Dropdown>
          <DropdownTrigger>
            <button className="w-4">{setting.icon}</button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Action">
            {actionList.map((action) => (
              <DropdownItem
                textValue={action.label || ""}
                key={action.label}
                color={action.color}
                onPress={action.onPress}
              >
                <span>轉換為 </span>
                <strong>{action.label}</strong>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
      {isMoreLabel && (
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
      )}
    </>
  );
});
