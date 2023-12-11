import { observer } from "mobx-react-lite";
import { NewNote, NotesAllCards, cardStore } from "../../../store/cardStore";
import { NoteCard } from "../../Card/NoteCard";
import { Heading, HeadingDivider } from "../../Heading";

const title = "所有筆記";
const subtitle = "筆記";

export const NotesAll = observer(() => {
  const notes = cardStore.getFilteredCardsWith(new NotesAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={notes.length} />
      <HeadingDivider />
      <ul className="grid w-full gap-3">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard note={note as NewNote} />
          </li>
        ))}
      </ul>
    </>
  );
});
