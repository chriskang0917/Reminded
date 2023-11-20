import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface IdeaCardToolProps {
  setting: {
    label: string;
    icon: React.ReactNode;
  };
  onOpen?: () => void;
}

export default function IdeaCardTool({ setting, onOpen }: IdeaCardToolProps) {
  return (
    <Dropdown key={setting.label} backdrop="blur">
      <DropdownTrigger>
        {setting.label === "action" ? (
          <button onClick={onOpen}>{setting.icon}</button>
        ) : (
          <button>{setting.icon}</button>
        )}
      </DropdownTrigger>
      {setting.label === "more" && (
        <DropdownMenu aria-label="Setting">
          <DropdownItem>複製</DropdownItem>
          <DropdownItem className="text-danger" color="danger">
            刪除
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
}
