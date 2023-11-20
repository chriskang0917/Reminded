import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";

interface CardToolProps {
  setting: {
    label: string;
    icon: React.ReactNode;
  };
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

export const TodoCardTool = observer(({ setting }: CardToolProps) => {
  return (
    <Dropdown key={setting.label} backdrop="blur">
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
  );
});
