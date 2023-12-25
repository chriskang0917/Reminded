import { Button, Spacer, useDisclosure } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { NewNote } from "../../../models/NewNote";
import { NotesAllCards, cardStore } from "../../../store/cardStore";
import EmptyCard from "../../Card/EmptyCard";
import { NoteCard } from "../../Card/NoteCard";
import ModalEditor from "../../Editor/ModalEditor";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "所有筆記";
const subtitle = "筆記";
const placeholder = "記錄下你的隨手筆記吧！";

export const NotesAll = observer(() => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const notes = cardStore.getFilteredCardsWith(new NotesAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={notes.length} />
      <div className="mt-5 hidden justify-center px-5 min-[370px]:flex md:hidden">
        <Button
          className="text-lg font-bold tracking-wider text-primary"
          fullWidth
          onPress={onOpen}
        >
          新增筆記
        </Button>
      </div>
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {notes.map((note) => (
            <MotionItem key={note.id}>
              <NoteCard note={note as NewNote} />
            </MotionItem>
          ))}
          {!notes.length && (
            <section className="flex flex-col items-center">
              <EmptyCard placeholder={placeholder} />
              <Spacer y={10} />
            </section>
          )}
        </MotionList>
      </SectionShadow>
      <ModalEditor
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        pageTitle="新增筆記"
      />
    </>
  );
});
