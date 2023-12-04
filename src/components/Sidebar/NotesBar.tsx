import {
  Divider,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Spinner,
  cn,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FcParallelTasks } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import { NewNote, NotesAllCards, cardStore } from "../../store/cardStore";
import { SubsideBar } from "./SubsideBar";
import SubsideButton from "./SubsideBarButton";

interface IAction {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const ideaActionList: IAction[] = [
  { label: "所有筆記", path: "/notes/all", icon: <FcParallelTasks /> },
  { label: "搜尋筆記", path: "/notes/search", icon: <IoIosSearch /> },
];

export const NotesBar = observer(() => {
  const { id } = useParams();

  const notes = cardStore.getFilteredCardsWith(
    new NotesAllCards(),
  ) as NewNote[];

  return (
    <SubsideBar>
      {ideaActionList.map((action) => (
        <li key={action.label}>
          <SubsideButton key={action.label} action={action}>
            <div className="flex h-full items-center justify-center gap-3">
              <span>{action.icon}</span>
              <span className="text-sm">{action.label}</span>
            </div>
          </SubsideButton>
        </li>
      ))}
      <Divider className="w-[80%]" />
      <ScrollShadow className="h-[400px]">
        {notes.length === 0 && (
          <div className="mt-2 flex justify-center">
            <Spinner />
          </div>
        )}
        <Listbox aria-label="Notes List" variant="flat" items={notes}>
          {notes.map((note) => (
            <ListboxItem
              className={cn("mx-auto w-[90%]", id === note.id && "bg-third")}
              key={note.id}
              href={`/notes/article/${note.id}`}
            >
              {note.noteTitle}
            </ListboxItem>
          ))}
        </Listbox>
      </ScrollShadow>
      <Divider className="w-[80%]" />
    </SubsideBar>
  );
});
