import { Card, CardBody, Image } from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { NewNote } from "../../../store/cardStore";
import BasicCard from "../BasicCard";
import NoteIcon from "./note-icon.svg";

interface NoteCardProps {
  card: NewNote;
}

export const NoteCard = ({ card }: NoteCardProps) => {
  const parsedDate = parseISO(card.createdTime);
  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  return (
    <BasicCard className="flex-row justify-start px-7" card={card}>
      <Card className="max-w-32 my-1 -ml-1 aspect-auto">
        <CardBody className="flex items-center justify-center">
          <Image src={NoteIcon} width={100} />
        </CardBody>
      </Card>
      <section className="ml-10 flex max-w-[60%] flex-col justify-between">
        <div className="flex flex-col gap-1">
          <Link to={`/notes/article/${card.id}`} className="h-full w-full">
            <h1 className="text-xl font-bold text-primary">
              {card.noteTitle || ""}
            </h1>
          </Link>
          <ul>
            {card.tags.map((tag) => (
              <li key={tag} className="text-sm text-third opacity-50">
                #{tag}
              </li>
            ))}
          </ul>
          <Link to={`/notes/article/${card.id}`} className="h-full w-full">
            <p className="text-sm tracking-wide text-secondary">
              {card.content.length < 49 ? card.content : `${card.content}...`}
            </p>
          </Link>
        </div>
        <span className="text-[0.75rem] text-third opacity-80">
          {formattedDate}
        </span>
      </section>
    </BasicCard>
  );
};
