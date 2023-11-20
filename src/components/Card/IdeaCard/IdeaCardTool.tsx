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

const CardTool = observer(({ card, setting, onOpen }: CardToolProps) => {
  const handleDuplicate = () => {
    cardStore.addCard(card.status, card.content, card.tags);
  };

  const handleDelete = () => {
    cardStore.deleteCard(card.id);
  };

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
          <DropdownItem onClick={handleDuplicate}>複製</DropdownItem>
          <DropdownItem
            onClick={handleDelete}
            className="text-danger"
            color="danger"
          >
            刪除
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
});

export default CardTool;
