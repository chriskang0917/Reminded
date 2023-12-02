import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import { SubsideBar } from "./SubsideBar";

interface IAction {
  label: string;
  path: string;
}

const ideaActionList: IAction[] = [
  { label: "本週靈感", path: "/idea/week" },
  { label: "搜尋靈感", path: "/idea/search" },
  { label: "靈感池", path: "/idea/pools" },
  { label: "已轉換", path: "/idea/action" },
  { label: "已封存", path: "/idea/archive" },
];

interface IButton {
  children: React.ReactNode;
  action: IAction;
  onClick?: () => void;
}

export const IdeaBar = observer(() => {
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
