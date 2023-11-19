import {
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { useRef } from "react";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiNoteBlankThin } from "react-icons/pi";
import { ICard, cardStore } from "../../store/cardStore";
import Editable from "../Editable";

export const IdeaCard = ({ card }: { card: ICard }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const settingIcons = [
    <PiNoteBlankThin />,
    <GrTransaction className="h-3" />,
    <HiOutlineDotsVertical />,
  ];

  return (
    <Card fullWidth radius="sm">
      <CardBody className="my-2 pl-3">
        <div className="flex items-center justify-between">
          <Editable
            id={card.id}
            text={card.content}
            placeholder="暫無內容..."
            childRef={inputRef}
            type="input"
          >
            <input
              className="inline-block w-full bg-transparent outline-none"
              type="text"
              name={card.status}
              defaultValue={card.content}
              ref={inputRef}
            />
          </Editable>
          <div className="flex w-24 items-center justify-between">
            {settingIcons.map((icon, index) => (
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <button>{icon}</button>
                </DropdownTrigger>
                {index === 2 && (
                  <DropdownMenu>
                    <DropdownItem>複製</DropdownItem>
                    <DropdownItem>編輯標籤</DropdownItem>
                    <DropdownItem className="text-danger" color="danger">
                      刪除
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {card.tags[0] !== "" ? (
            card.tags.map((tag) => (
              <Chip
                size="sm"
                key={tag}
                className="mt-2 px-2"
                onClose={() => cardStore.deleteTag(card.id, tag)}
              >
                {tag}
              </Chip>
            ))
          ) : (
            <Link className="mb-2 mt-3 underline" size="sm">
              新增標籤
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
