import { Outlet } from "react-router-dom";
import { TodoBar } from "../Sidebar";
import MainBackdrop from "./MainBackdrop";

function TodoLayout() {
  return (
    <>
      <TodoBar />
      <MainBackdrop>
        <Outlet />
      </MainBackdrop>
    </>
  );
}

export default TodoLayout;
