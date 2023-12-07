import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { NewNote, NotesAllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { NoteCard } from "../Card/NoteCard";

const Title = "所有筆記";

export const NotesAll = observer(() => {
  const notes = cardStore.getFilteredCardsWith(new NotesAllCards());

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.pageTitle}>{Title}</h1>
      <Divider />
      <ul className="mt-5 grid w-full gap-3">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard note={note as NewNote} />
          </li>
        ))}
      </ul>
    </div>
  );
});
