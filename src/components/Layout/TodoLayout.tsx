import { Outlet } from "react-router-dom";
import { TodoBar } from "../Sidebar/TodoBar";

function TodoLayout() {
  return (
    <>
      <TodoBar />
      <Outlet />
    </>
  );
}

export default TodoLayout;
