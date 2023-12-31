import { format, parseISO } from "date-fns";
import parse from "html-react-parser";
import { NewNote } from "./NewNote";

export class Note {
  private note: NewNote;

  constructor(note: NewNote) {
    this.note = note;
  }

  get details() {
    return this.note;
  }

  get noteTitle() {
    return this.note.noteTitle;
  }

  get parsedNoteHTML() {
    return parse(this.note.noteHTML);
  }

  get createdTime() {
    const parsedDate = parseISO(this.note.createdTime);
    return format(parsedDate, "yyyy-MM-dd");
  }

  get tags() {
    return this.note.tags;
  }
}
