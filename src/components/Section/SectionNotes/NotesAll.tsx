import { observer } from "mobx-react-lite";
import { NewNote, NotesAllCards, cardStore } from "../../../store/cardStore";
import { NoteCard } from "../../Card/NoteCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "所有筆記";
const subtitle = "筆記";

export const NotesAll = observer(() => {
  const notes = cardStore.getFilteredCardsWith(new NotesAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={notes.length} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {notes.map((note) => (
            <MotionItem key={note.id}>
              <NoteCard note={note as NewNote} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </>
  );
});
