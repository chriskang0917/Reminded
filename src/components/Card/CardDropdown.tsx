import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ICard, cardStore } from "../../store/cardStore";

interface ICardDropdown {
  card: ICard;
}

export const CardDropdown = observer(({ card }: ICardDropdown) => {
  return (
    <Dropdown className="max-w-1 flex items-center justify-between">
      <DropdownTrigger>
        <button>
          <BsThreeDotsVertical />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Card options">
        <DropdownItem key="action">Action</DropdownItem>
        <DropdownItem key="note">Note</DropdownItem>
        <DropdownItem
          key="delete"
          onPress={() => cardStore.deleteCard(card.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
});
