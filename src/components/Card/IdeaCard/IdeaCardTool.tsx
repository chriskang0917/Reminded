import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { NewCard } from "../../../models/NewCard";
import { ICard, cardStore } from "../../../store/cardStore";

interface IdeaCardToolProps {
  card: ICard;
  setting: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
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

const IdeaCardTool = observer(({ card, setting }: IdeaCardToolProps) => {
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
        <button onClick={setting.onClick}>{setting.icon}</button>
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

export default IdeaCardTool;
