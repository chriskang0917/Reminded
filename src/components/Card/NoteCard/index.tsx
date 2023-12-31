import { Card, CardBody, Image } from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { NewNote } from "../../../models/NewNote";
import BasicCard from "../BasicCard";
import NoteIcon from "./note-icon.svg";

interface NoteCardProps {
  note: NewNote;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const parsedDate = parseISO(note.createdTime);
  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  const renderNoteImage = () => {
    return (
      <Card className="max-w-32 my-1 -ml-1 aspect-auto">
        <CardBody className="flex items-center justify-center">
          <Link to={`/notes/article/${note.id}`} className="h-full w-full">
            <Image src={NoteIcon} width={80} />
          </Link>
        </CardBody>
      </Card>
    );
  };

  const renderNoteTitle = () => {
    return (
      <Link to={`/notes/article/${note.id}`} className="h-full w-full">
        <h1 className="text-xl font-bold text-primary">
          {note.noteTitle || ""}
        </h1>
      </Link>
    );
  };

  const renderNoteTags = () => {
    return (
      <ul>
        {note.tags.map((tag) => (
          <li key={tag} className="text-sm text-third opacity-50">
            #{tag}
          </li>
        ))}
      </ul>
    );
  };

  const renderNoteContent = () => {
    return (
      <Link to={`/notes/article/${note.id}`} className="h-full w-full">
        <p className="text-sm tracking-wide text-secondary">
          {note.content.length < 49 ? note.content : `${note.content}...`}
        </p>
      </Link>
    );
  };

  return (
    <BasicCard className="flex-row justify-start px-7" card={note}>
      {renderNoteImage()}
      <section className="ml-10 flex max-w-[60%] flex-col justify-between">
        <div className="flex flex-col gap-1">
          {renderNoteTitle()}
          {renderNoteTags()}
          {renderNoteContent()}
        </div>
        <span className="text-[0.75rem] text-third opacity-80">
          {formattedDate}
        </span>
      </section>
    </BasicCard>
  );
};
