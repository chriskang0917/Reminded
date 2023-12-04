import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import { SubsideBar } from "./SubsideBar";

interface IAction {
  label: string;
  path: string;
}

const ideaActionList: IAction[] = [
  { label: "所有筆記", path: "/notes/all" },
  { label: "搜尋筆記", path: "/notes/search" },
];

interface IButton {
  children: React.ReactNode;
  action: IAction;
  onClick?: () => void;
}

export const NotesBar = observer(() => {
  const location = useLocation();

  const NotesButton = ({ children, action, onClick }: IButton) => (
    <Link to={action.path}>
      <button
        className="bg-zinc-400 flex items-center justify-center"
        disabled={location.pathname === action.path}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );

  return (
    <SubsideBar>
      {ideaActionList.map((action) => (
        <li key={action.label}>
          <NotesButton key={action.label} action={action}>
            {action.label}
          </NotesButton>
        </li>
      ))}
      {}
    </SubsideBar>
  );
});
