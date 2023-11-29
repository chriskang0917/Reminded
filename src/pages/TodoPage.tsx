import { useParams } from "react-router-dom";
import { ActionAll } from "../components/SectionAction/ActionAll";
import {
  TodoAll,
  TodoComplete,
  TodoToday,
  TodoTomorrow,
  TodoWeek,
} from "../components/SectionTodo";

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
    case "actions":
      return <ActionAll />;
    case "complete":
      return <TodoComplete />;
  }
};

function TodoPage() {
  const { route } = useParams();
  return <section>{renderTodoPage(route)}</section>;
}

export default TodoPage;
