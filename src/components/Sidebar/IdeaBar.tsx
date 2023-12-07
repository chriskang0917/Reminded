import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { BsCalendar2Week } from "react-icons/bs";
import { FcParallelTasks } from "react-icons/fc";
import { GrTransaction } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { IoArchiveOutline } from "react-icons/io5";
import { SubsideBar } from "./SubsideBar";
import SubsideButton from "./SubsideBarButton";

interface IAction {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const ideaActionList: IAction[] = [
  { label: "搜尋靈感", path: "/idea/search", icon: <IoIosSearch /> },
  { label: "所有靈感", path: "/idea/pools", icon: <FcParallelTasks /> },
  { label: "已轉換", path: "/idea/action", icon: <GrTransaction /> },
  { label: "已封存", path: "/idea/archive", icon: <IoArchiveOutline /> },
];

export const IdeaBar = observer(() => {
  return (
    <SubsideBar>
      <li>
        <SubsideButton
          className="h-12"
          action={{ label: "本週靈感", path: "/idea/week" }}
        >
          <div className="flex h-full items-center justify-center gap-3">
            <BsCalendar2Week />
            <span className="text-sm">本週靈感</span>
          </div>
        </SubsideButton>
      </li>
      <Divider className="w-[80%]" />
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
    </SubsideBar>
  );
});
