import { Button, Divider, Spacer } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

interface IAction {
  label: string;
  path: string;
}

const ideaActionList: IAction[] = [
  { label: "This Week", path: "/idea/week" },
  { label: "Explore", path: "/idea/explore" },
  { label: "Idea Pools", path: "/idea/pools" },
  { label: "Transformed", path: "/idea/transformed" },
  { label: "Archive", path: "/idea/archive" },
];
const ideaFavoriteList = ["health", "work", "life"];

interface IButton {
  children: React.ReactNode;
  action: IAction;
  onClick?: () => void;
}

function IdeaBar() {
  const location = useLocation();

  const IdeaButton = ({ children, action, onClick }: IButton) => (
    <Link to={action.path}>
      <Button
        className="flex items-center justify-center"
        size="md"
        isDisabled={location.pathname === action.path}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );

  const FavoriteButton = ({ children }: { children: React.ReactNode }) => (
    <Button className="flex items-center justify-center" size="sm">
      {children}
    </Button>
  );

  return (
    <div className="ml-20 h-[100svh] w-32 bg-slate-200">
      <nav>
        <ul className="flex flex-col items-center justify-center gap-4 pt-4">
          {ideaActionList.map((action) => (
            <li key={action.label}>
              <IdeaButton key={action.label} action={action}>
                {action.label}
              </IdeaButton>
            </li>
          ))}
        </ul>
        <Spacer y={2} />
        <div className="mt-10 flex flex-col items-center">
          <h2>Favorite</h2>
          <Divider className="my-4" />
          <ul className="flex flex-col gap-4">
            {ideaFavoriteList.map((favorite) => (
              <li key={favorite}>
                <FavoriteButton>{favorite}</FavoriteButton>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default IdeaBar;
