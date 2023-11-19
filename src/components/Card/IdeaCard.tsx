import { Card, CardBody } from "@nextui-org/react";
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
      </CardBody>
    </Card>
  );
};
