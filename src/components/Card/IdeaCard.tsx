import { Card, CardBody } from "@nextui-org/react";
import { useRef } from "react";
import { ICard } from "../../store/cardStore";
import Editable from "../Editable";

interface IdeaCardProps {
  card: ICard;
}

export const IdeaCard = ({ card }: IdeaCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card fullWidth radius="sm">
      <CardBody className="my-2 pl-3">
        <Editable
          text={card.content}
          placeholder="Write something here"
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
