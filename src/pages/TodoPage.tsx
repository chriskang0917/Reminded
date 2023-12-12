import { useParams } from "react-router-dom";
import {
  TodoAll,
  TodoComplete,
  TodoToday,
  TodoTomorrow,
  TodoWeek,
} from "../components/Section/SectionTodo";
import { TodoExpired } from "../components/Section/SectionTodo/TodoExpired";

const renderTodoPage = (route: string | undefined) => {
  switch (route) {
    case "tomorrow":
      return <TodoTomorrow />;
    case "all":
      return <TodoAll />;
    case "today":
      return <TodoToday />;
    case "week":
      return <TodoWeek />;
    case "expired":
      return <TodoExpired />;
    case "complete":
      return <TodoComplete />;
  }
};

function TodoPage() {
  const { route } = useParams();
  return <section className="relative">{renderTodoPage(route)}</section>;
}

export default TodoPage;
