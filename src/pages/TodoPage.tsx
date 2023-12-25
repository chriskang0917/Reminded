import { Navigate, useParams } from "react-router-dom";
import {
  TodoAll,
  TodoComplete,
  TodoToday,
  TodoTomorrow,
  TodoWeek,
} from "../components/Section/SectionTodo";
import { TodoExpired } from "../components/Section/SectionTodo/TodoExpired";
import useDocTitle from "../hooks/useDocTitle";

type Route = keyof typeof routeStrategy;

const routeStrategy = {
  today: <TodoToday />,
  tomorrow: <TodoTomorrow />,
  week: <TodoWeek />,
  expired: <TodoExpired />,
  all: <TodoAll />,
  complete: <TodoComplete />,
};

const renderTodoPage = (route: Route | undefined) => {
  if (!route) return <Navigate to="/" replace />;
  if (route in routeStrategy) return routeStrategy[route];
  return <Navigate to="/" replace />;
};

function TodoPage() {
  const { route } = useParams();
  useDocTitle("Reminded | 待辦");
  return (
    <section className="relative">{renderTodoPage(route as Route)}</section>
  );
}

export default TodoPage;
