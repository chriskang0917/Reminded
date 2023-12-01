import { Outlet } from "react-router-dom";
import { TodoBar } from "../Sidebar";

function TodoLayout() {
  return (
    <>
      <TodoBar />
      <Outlet />
    </>
  );
}

export default TodoLayout;
