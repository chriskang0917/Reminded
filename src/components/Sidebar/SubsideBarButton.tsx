import { Card, CardBody, cn } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

interface ITodo {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface IButton {
  children: React.ReactNode;
  className?: string;
  action: ITodo;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SubsideButton = ({ className, children, action, onClick }: IButton) => {
  const location = useLocation();

  return (
    <Link to={action.path}>
      <Card
        isBlurred
        radius="sm"
        className={cn(
          "my-1 flex h-10 w-[120px] cursor-pointer items-center text-primary",
          "text-xs font-semibold tracking-wider",
          "hover:bg-fourthDark transition-all hover:text-white",
          className,
          location.pathname === action.path && "bg-fourthDark text-white",
        )}
        onClick={onClick}
      >
        <CardBody>{children}</CardBody>
      </Card>
    </Link>
  );
};

export default SubsideButton;
