import { Outlet } from "react-router-dom";
import { NotesBar } from "../Sidebar/NotesBar";

function NotesLayout() {
  return (
    <>
      <NotesBar />
      <div className="relative z-50">
        <div className=" fixed left-0 top-0 ml-52 h-[100svh] w-full rounded-[40px] bg-white" />
        <Outlet />
      </div>
    </>
  );
}

export default NotesLayout;
