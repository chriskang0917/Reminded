import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaRegCircleQuestion } from "react-icons/fa6";

const shortcuts = [
  {
    key: "focus",
    label: "觸發輸入框",
    shortcut: "⌘ I",
  },
  {
    key: "switch",
    label: "切換靈感與待辦輸入",
    shortcut: "⌘ ⇧ I",
  },
  {
    key: "enter",
    label: "完成編輯或送出",
    shortcut: "Enter ↲",
  },
];

function Helper() {
  return (
    <div className="fixed bottom-4 right-4 z-50 cursor-pointer">
      <Dropdown>
        <DropdownTrigger>
          <button>
            <FaRegCircleQuestion className="h-6 w-6 text-primary transition-colors hover:text-third" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with shortcuts">
          {shortcuts.map((shortcut) => (
            <DropdownItem key={shortcut.key} shortcut={shortcut.shortcut}>
              {shortcut.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Helper;
