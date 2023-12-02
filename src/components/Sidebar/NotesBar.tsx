import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

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
        className="flex items-center justify-center bg-zinc-400"
        disabled={location.pathname === action.path}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );

  return (
    <div className="bg-fourth fixed left-0 top-0 z-20 ml-20 h-[100svh] w-32 rounded-[40px] pt-20">
      <aside>
        <ul className="relative z-10 flex flex-col items-center justify-center gap-4 pt-4">
          {ideaActionList.map((action) => (
            <li key={action.label}>
              <NotesButton key={action.label} action={action}>
                {action.label}
              </NotesButton>
            </li>
          ))}
        </ul>
      </aside>
      <div
        aria-label="backdrop"
        className="bg-fourth fixed top-0 z-0 ml-20 h-[100svh] w-full"
      />
    </div>
  );
});
