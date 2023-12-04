import { observer } from "mobx-react-lite";
import { FcParallelTasks } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
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
      {}
    </SubsideBar>
  );
});
