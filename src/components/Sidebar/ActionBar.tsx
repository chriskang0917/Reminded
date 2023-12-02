import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import { SubsideBar } from "./SubsideBar";

interface IAction {
  label: string;
  path: string;
}

const ideaActionList: IAction[] = [
  { label: "所有行動", path: "/action/all" },
  { label: "搜尋行動", path: "/action/search" },
  { label: "已過期行動", path: "/action/expire" },
  { label: "已執行行動", path: "/action/executed" },
  { label: "封存行動", path: "/action/archive" },
];

interface IButton {
  children: React.ReactNode;
  action: IAction;
  onClick?: () => void;
}

export const ActionBar = observer(() => {
  const location = useLocation();

  const IdeaButton = ({ children, action, onClick }: IButton) => (
    <Link to={action.path}>
      <button
        className="flex items-center justify-center bg-zinc-400"
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
          <IdeaButton key={action.label} action={action}>
            {action.label}
          </IdeaButton>
        </li>
      ))}
    </SubsideBar>
  );
});
