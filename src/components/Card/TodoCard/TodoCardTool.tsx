import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { ICard, cardStatus, cardStore } from "../../../store/cardStore";
import DatePicker from "./DatePicker";

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
  onClick?: () => void;
}

export const TodoCardTool = observer(({ card, setting }: CardToolProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    card.dueDate,
  );

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    cardStore.updateDueDate(card.id, date);
  };

  const handleDuplicate = () => {
    cardStore.addCard(card.status, card.content, card.tags);
  };

  const handleArchive = () => {
    cardStore.archiveCard(card.id);
  };

  const handleDelete = () => {
    cardStore.deleteCard(card.id);
  };

  const handleUpdateStatus = (status: cardStatus) => {
    cardStore.updateCardStatus(card.id, status);
  };

  const menuList: IList[] = [
    { label: "複製", color: "default", onClick: handleDuplicate },
    { label: "封存", color: "warning", onClick: handleArchive },
    { label: "刪除", color: "danger", onClick: handleDelete },
  ];

  const actionList: IList[] = [
    {
      label: "行動",
      color: "default",
      onClick: () => handleUpdateStatus("action"),
    },
    {
      label: "靈感",
      color: "default",
      onClick: () => handleUpdateStatus("idea"),
    },
    {
      label: "筆記",
      color: "success",
      onClick: () => handleUpdateStatus("note"),
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
              date={selectedDate}
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
                key={action.label}
                color={action.color}
                onClick={action.onClick}
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
                    key={menu.label}
                    color={menu.color}
                    onClick={menu.onClick}
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
