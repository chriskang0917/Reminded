import { Card, CardBody, Image } from "@nextui-org/react";
import { ICard } from "../../../store/cardStore";
import BasicCard from "../BasicCard";
import NoteIcon from "./note-icon.svg";

interface NoteCardProps {
  card: ICard;
}

export const NoteCard = ({ card }: NoteCardProps) => {
  return (
    <BasicCard className="flex-row justify-start px-7" card={card}>
      <Card className="my-1 -ml-1 h-32 w-32">
        <CardBody className="flex items-center justify-center">
          <Image src={NoteIcon} width={100} />
        </CardBody>
      </Card>
      <section className="ml-10 flex max-w-[60%] flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold text-primary">{card.id}</h1>
          <p className="mt-1 text-sm tracking-wide text-secondary">
            {card.content}124124912 172648912748
          </p>
        </div>
        <ul className="mb-2">
          {card.tags.map((tag) => (
            <li key={tag} className="text-third text-sm opacity-50">
              #{tag}
            </li>
          ))}
        </ul>
      </section>
    </BasicCard>
  );
};
