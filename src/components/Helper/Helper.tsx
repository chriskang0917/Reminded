import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/authStore";
import { QuestionIcon } from "./QuestionIcon";

const shortcuts = [
  {
    key: "quickInput",
    label: "開啟快速輸入框",
    shortcut: "N",
  },
  {
    key: "switchInput",
    label: "切換快速輸入類別",
    shortcut: "⌘ I",
  },
  {
    key: "focus",
    label: "觸發首頁輸入框",
    shortcut: "⌘ I",
  },
  {
    key: "switch",
    label: "切換首頁輸入類別",
    shortcut: "⌘ O",
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

const disabledKeys = ["quickInput", "switchInput", "focus", "switch", "enter"];

const Helper = observer(() => {
  return (
    <div className="fixed bottom-4 right-7 z-50 hidden cursor-pointer md:block">
      <Dropdown>
        <DropdownTrigger>
          <button>
            <QuestionIcon className="h-8 w-8 text-primary transition-colors hover:text-third" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dropdown menu with shortcuts"
          disabledKeys={disabledKeys}
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
