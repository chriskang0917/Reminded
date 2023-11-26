import { Chip, Divider, Input, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { authStore } from "../../store/authStore";

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
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isFavoriteOpen) tagInputRef.current?.focus();
  }, [isFavoriteOpen]);

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tag = tagInputRef.current?.value;
    if (!tag) return;
    setIsFavoriteOpen(false);
  };

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

  interface FavoriteTagChipProps {
    children: React.ReactNode;
    favorite: string;
  }

  const FavoriteTagChip = ({ children, favorite }: FavoriteTagChipProps) => {
    const handleClose = () => {
      console.log(favorite);
    };

    return (
      <Chip className="flex items-center justify-center" onClose={handleClose}>
        {children}
      </Chip>
    );
  };

  return (
    <div className="fixed left-0 top-0 ml-20 h-[100svh] w-32 bg-slate-200">
      <aside>
        <ul className="flex flex-col items-center justify-center gap-4 pt-4">
          {TodoList.map((action) => (
            <li key={action.label}>
              <TodoButton key={action.label} action={action}>
                {action.label}
              </TodoButton>
            </li>
          ))}
        </ul>
        <Spacer y={2} />
        <div className="mt-10 flex flex-col items-center">
          <h2>Favorite</h2>
          <Divider className="my-4" />
          <ul className="flex flex-col items-center gap-4">
            {authStore.favoriteActionTags.map((favorite) => (
              <li key={favorite}>
                <FavoriteTagChip favorite={favorite}>
                  {favorite}
                </FavoriteTagChip>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {isFavoriteOpen ? (
              <form onSubmit={handleTagSubmit}>
                <Input
                  variant="faded"
                  ref={tagInputRef}
                  onBlur={() => setIsFavoriteOpen(false)}
                >
                  輸入
                </Input>
                <button type="submit"></button>
              </form>
            ) : (
              <button onClick={() => setIsFavoriteOpen(true)}>
                <IoIosAddCircleOutline />
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
});