import {
  Card,
  CardBody,
  Divider,
  ScrollShadow,
  Spinner,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FcParallelTasks } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useStopShortcut } from "../../hooks/useStopShortcut";
import { NewNote } from "../../models/NewNote";
import { NotesAllCards, cardStore } from "../../store/cardStore";
import ModalEditor from "../Editor/ModalEditor";
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
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  useStopShortcut(isOpen);

  const notes = cardStore.getFilteredCardsWith(
    new NotesAllCards(),
  ) as NewNote[];

  return (
    <SubsideBar>
      <Card
        isBlurred
        radius="sm"
        className={cn(
          "my-1 flex h-12 w-[120px] cursor-pointer items-center text-primary",
          "text-xs font-semibold tracking-wider",
          "transition-all hover:bg-fourthDark hover:text-white",
        )}
      >
        <CardBody onClick={onOpen}>
          <div className="flex h-full items-center justify-center gap-3">
            <span>+</span>
            <span className="text-sm">新增筆記</span>
          </div>
        </CardBody>
      </Card>
      {ideaActionList.map((action) => (
        <li key={action.label}>
          <SubsideButton key={action.label} action={action}>
            <span>{action.icon}</span>
            <span className="text-sm">{action.label}</span>
          </SubsideButton>
        </li>
      ))}
      <Divider className="w-[80%]" />
      <ScrollShadow className="h-[calc(50vh-150px)]" hideScrollBar size={10}>
        {!cardStore.isLoaded && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <Spinner />
            <p className="text-sm text-secondary">讀取中...</p>
          </div>
        )}
        {cardStore.isLoaded && notes.length === 0 && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <p className="text-sm text-secondary">新增一些筆記吧！</p>
          </div>
        )}
        <ul aria-label="Notes List" className="inline-block w-[90%]">
          {notes.map((note) => (
            <li key={note.id} className="mx-2">
              <Card
                className={cn(
                  "mx-auto my-2 h-10 w-[120px] bg-fourth",
                  "flex items-center justify-center",
                  id === note.id && "bg-third",
                )}
                radius="sm"
                shadow="sm"
              >
                <Link
                  to={`/notes/article/${note.id}`}
                  className="block w-full text-center text-sm"
                >
                  {note?.noteTitle?.length > 6
                    ? note.noteTitle.slice(0, 6) + "..."
                    : note.noteTitle}
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </ScrollShadow>
      <Divider className="w-[80%]" />
      <ModalEditor
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        pageTitle="新增一篇筆記"
      />
    </SubsideBar>
  );
});
