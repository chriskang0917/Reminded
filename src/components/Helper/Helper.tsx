import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { authStore } from "../../store/authStore";

const shortcuts = [
  {
    key: "focus",
    label: "觸發輸入框",
    shortcut: "⇧ I",
  },
  {
    key: "switch",
    label: "切換輸入類別",
    shortcut: "⇧ O",
  },
  {
    key: "enter",
    label: "完成編輯 / 送出",
    shortcut: "Enter ↲",
  },
  {
    key: "reset",
    label: "重置教學",
  },
];

const Helper = observer(() => {
  return (
    <div className="fixed bottom-4 right-7 z-50 cursor-pointer">
      <Dropdown>
        <DropdownTrigger>
          <button>
            <FaRegCircleQuestion className="h-6 w-6 text-primary transition-colors hover:text-third" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with shortcuts"
          disabledKeys={["focus", "switch", "enter"]}
        >
          {shortcuts.map((shortcut) => (
            <DropdownItem
              isReadOnly
              key={shortcut.key}
              shortcut={shortcut?.shortcut}
              color="warning"
              onClick={() => authStore.resetTutorialProgress()}
            >
              {shortcut.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
});

export default Helper;
