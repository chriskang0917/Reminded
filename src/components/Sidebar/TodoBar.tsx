import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { BsCalendar2Week } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { GrTask } from "react-icons/gr";
import { MdOutlineToday, MdTaskAlt } from "react-icons/md";
import { SubsideBar } from "./SubsideBar";
import SubsideButton from "./SubsideBarButton";

interface ITodo {
  label: string;
  path: string;
  icon?: React.ReactNode;
  id?: string;
}

const TodoList: ITodo[] = [
  { label: "明日待辦", path: "/todo/tomorrow", icon: <CiCalendarDate /> },
  {
    label: "本週待辦",
    path: "/todo/week",
    icon: <BsCalendar2Week />,
    id: "tutorial-todo-3",
  },
  { label: "過期待辦", path: "/todo/expired", icon: <FaRegCalendarXmark /> },
  { label: "所有待辦", path: "/todo/all", icon: <GrTask /> },
  { label: "已完成", path: "/todo/complete", icon: <MdTaskAlt /> },
];

export const TodoBar = observer(() => {
  return (
    <SubsideBar>
      <li>
        <SubsideButton
          className="h-12"
          action={{ label: "今日待辦", path: "/todo/today" }}
        >
          <div className="flex h-full items-center justify-center gap-3">
            <span>
              <MdOutlineToday />
            </span>
            <span className="text-sm">今日待辦</span>
          </div>
        </SubsideButton>
      </li>
      <Divider className="w-[80%]" />
      {TodoList.map((action) => (
        <li id={action.id} key={action.label}>
          <SubsideButton key={action.label} action={action}>
            <span>{action.icon}</span>
            <span className="text-sm">{action.label}</span>
          </SubsideButton>
        </li>
      ))}
    </SubsideBar>
  );
});
