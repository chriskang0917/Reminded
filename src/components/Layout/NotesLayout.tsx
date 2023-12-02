import { Outlet } from "react-router-dom";
import { NotesBar } from "../Sidebar/NotesBar";

function NotesLayout() {
  return (
    <>
      <NotesBar />
      <Outlet />
    </>
  );
}

export default NotesLayout;
