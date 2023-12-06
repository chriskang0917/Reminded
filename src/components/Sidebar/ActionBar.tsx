import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FcParallelTasks } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import { IoArchiveOutline } from "react-icons/io5";
import { VscTasklist } from "react-icons/vsc";
import { SubsideBar } from "./SubsideBar";
import SubsideButton from "./SubsideBarButton";

interface IAction {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const ideaActionList: IAction[] = [
  { label: "搜尋行動", path: "/action/search", icon: <IoIosSearch /> },
  {
    label: "已過期",
    path: "/action/expire",
    icon: <FaRegCalendarXmark />,
  },
  { label: "已執行", path: "/action/executed", icon: <VscTasklist /> },
  {
    label: "已封存",
    path: "/action/archive",
    icon: <IoArchiveOutline />,
  },
];

export const ActionBar = observer(() => {
  return (
    <SubsideBar>
      <li>
        <SubsideButton
          className="h-12"
          action={{ label: "所有行動", path: "/action/all" }}
        >
          <div className="flex h-full items-center justify-center gap-3">
            <FcParallelTasks />
            <span className="text-sm">所有行動</span>
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
