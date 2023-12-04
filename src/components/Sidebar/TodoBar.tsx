import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import { SubsideBar } from "./SubsideBar";

interface ITodo {
  label: string;
  path: string;
}

const TodoList: ITodo[] = [
  { label: "明日待辦", path: "/todo/tomorrow" },
  { label: "所有待辦", path: "/todo/all" },
  { label: "今日待辦", path: "/todo/today" },
  { label: "本週待辦", path: "/todo/week" },
  { label: "行動任務", path: "/todo/actions" },
  { label: "已完成", path: "/todo/complete" },
];

interface IButton {
  children: React.ReactNode;
  action: ITodo;
  onClick?: () => void;
}

export const TodoBar = observer(() => {
  const location = useLocation();

  const TodoButton = ({ children, action, onClick }: IButton) => (
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
      {TodoList.map((action) => (
        <li key={action.label}>
          <TodoButton key={action.label} action={action}>
            {action.label}
          </TodoButton>
        </li>
      ))}
    </SubsideBar>
  );
});
