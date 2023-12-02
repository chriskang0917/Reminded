import { Outlet } from "react-router-dom";
import { IdeaBar } from "../Sidebar";
import MainBackdrop from "./MainBackdrop";

function IdeaLayout() {
  return (
    <>
      <IdeaBar />
      <MainBackdrop>
        <Outlet />
      </MainBackdrop>
    </>
  );
}

export default IdeaLayout;
