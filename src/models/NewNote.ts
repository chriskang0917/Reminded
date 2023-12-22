import { cardStatus } from "../store/cardStore";
import { NewCard } from "./NewCard";

export class NewNote extends NewCard {
  noteTitle: string = "";
  noteHTML: string = "";

  constructor(
    noteTitle: string,
    content: string,
    noteHTML: string,
    tags: string[],
    status: cardStatus = "note",
  ) {
    super(content, tags, status);
    this.noteTitle = noteTitle;
    this.noteHTML = noteHTML;
  }
}
