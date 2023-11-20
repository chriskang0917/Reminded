import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ICard, cardStore } from "../../store/cardStore";

interface IdeaCardToolProps {
  card: ICard;
  setting: {
    label: string;
    icon: React.ReactNode;
  };
  onOpen?: () => void;
}

const IdeaCardTool = observer(
  ({ card, setting, onOpen }: IdeaCardToolProps) => {
    const handleDuplicate = () => {
      cardStore.addCard(card.status, card.content, card.tags);
    };

    const handleDelete = () => {
      cardStore.deleteCard(card.id);
    };

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
  },
);

export default IdeaCardTool;
