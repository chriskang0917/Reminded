import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ICard, cardStore } from "../../../store/cardStore";

interface CardToolProps {
  card: ICard;
  setting: {
    label: string;
    icon: React.ReactNode;
  };
  onOpen?: () => void;
}

interface MenuList {
  label: string;
  color?:
    | "default"
    | "warning"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | undefined;
  onClick?: () => void;
}

const CardTool = observer(({ card, setting, onOpen }: CardToolProps) => {
  const handleDuplicate = () => {
    cardStore.addCard(card.status, card.content, card.tags);
  };

  const handleDelete = () => {
    cardStore.deleteCard(card.id);
  };

  const handleArchive = () => {
    cardStore.archiveCard(card.id);
    cardStore.updateCardToFirebase(card.id, { isArchived: true });
  };

  const menuList: MenuList[] = [
    {
      label: "複製",
      onClick: handleDuplicate,
    },
    { label: "封存", color: "warning", onClick: handleArchive },
    {
      label: "刪除",
      color: "danger",
      onClick: handleDelete,
    },
  ];

  return (
    <Dropdown key={setting.label} backdrop="opaque">
      <DropdownTrigger>
        {setting.label === "action" ? (
          <button onClick={onOpen}>{setting.icon}</button>
        ) : (
          <button>{setting.icon}</button>
        )}
      </DropdownTrigger>
      {setting.label === "more" && (
        <DropdownMenu aria-label="Setting">
          {menuList.map((menu) => (
            <DropdownItem
              onPress={menu.onClick}
              key={menu.label}
              color={menu.color}
            >
              {menu.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
});

export default CardTool;
