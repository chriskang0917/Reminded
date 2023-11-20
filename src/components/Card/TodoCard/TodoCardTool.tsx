import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { ICard, cardStore } from "../../../store/cardStore";
import DatePicker from "./DatePicker";

interface CardToolProps {
  setting: {
    label: string;
    icon: React.ReactNode;
  };
  card: ICard;
}

interface MenuList {
  label: string;
  color:
    | "default"
    | "warning"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | undefined;
}

const menuList: MenuList[] = [
  { label: "複製", color: "default" },
  { label: "封存", color: "warning" },
  { label: "刪除", color: "danger" },
];

export const TodoCardTool = observer(({ card, setting }: CardToolProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    card.dueDate,
  );

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    cardStore.updateExecuteDate(card.id, date);
  };

  return (
    <div className="flex">
      {selectedDate && (
        <p className="text-[0.75rem]">{selectedDate?.toDateString()}</p>
      )}
      <div className="w-10">
        {setting.label === "date" && !selectedDate && (
          <Popover placement="bottom">
            <PopoverTrigger>
              <button>{setting.icon}</button>
            </PopoverTrigger>
            <PopoverContent>
              {!selectedDate && (
                <DatePicker date={selectedDate} setDate={handleDateChange} />
              )}
            </PopoverContent>
          </Popover>
        )}
        {setting.label !== "date" && (
          <Dropdown key={setting.label} backdrop="opaque">
            <DropdownTrigger>
              <button>{setting.icon}</button>
            </DropdownTrigger>
            {setting.label === "more" && (
              <DropdownMenu aria-label="Setting">
                {menuList.map((menu) => (
                  <DropdownItem key={menu.label} color={menu.color}>
                    {menu.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </div>
    </div>
  );
});
