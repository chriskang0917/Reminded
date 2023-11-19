import { Card, CardBody, Chip, Link } from "@nextui-org/react";
import { useRef } from "react";
import { ICard } from "../../store/cardStore";
import Editable from "../Editable";

export const IdeaCard = ({ card }: { card: ICard }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card fullWidth radius="sm">
      <CardBody className="my-2 pl-3">
        <Editable
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
        <div className="flex gap-2">
          {card.tags[0] !== "" ? (
            card.tags.map((tag) => (
              <Chip
                size="sm"
                key={tag}
                className="mt-2 px-2"
                onClose={() => {}}
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
