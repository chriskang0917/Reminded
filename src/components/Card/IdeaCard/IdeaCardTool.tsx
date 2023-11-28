import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ICard, NewCard, cardStore } from "../../../store/cardStore";

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
  onPress?: () => void;
}

const CardTool = observer(({ card, setting, onOpen }: CardToolProps) => {
  const handleDuplicate = () => {
    const duplicateText = `${card.content} copy`;
    const newCard = new NewCard(duplicateText, card.tags, card.status);
    cardStore.addCard(newCard);
    cardStore.addCardToFireStore(newCard);
  };

  const handleDelete = () => {
    cardStore.deleteCard(card.id);
    cardStore.deleteCardFromFireStore(card.id);
  };

  const handleArchive = () => {
    cardStore.updateCard(card.id, { isArchived: true });
    cardStore.updateCardToFirebase(card.id, { isArchived: true });
  };

  const menuList: MenuList[] = [
    {
      label: "複製",
      onPress: handleDuplicate,
    },
    { label: "封存", color: "warning", onPress: handleArchive },
    {
      label: "刪除",
      color: "danger",
      onPress: handleDelete,
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
              onPress={menu.onPress}
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
