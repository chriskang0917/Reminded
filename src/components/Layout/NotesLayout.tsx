import { Outlet } from "react-router-dom";
import { NotesBar } from "../Sidebar/NotesBar";
import MainBackdrop from "./MainBackdrop";

function NotesLayout() {
  return (
    <>
      <NotesBar />
      <div className="relative z-20">
        <MainBackdrop>
          <Outlet />
        </MainBackdrop>
      </div>
    </>
  );
}

export default NotesLayout;
