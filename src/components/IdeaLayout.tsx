import { Outlet } from "react-router-dom";
import IdeaBar from "./Sidebar/IdeaBar";

function IdeaLayout() {
  return (
    <>
      <IdeaBar />
      <Outlet />
    </>
  );
}

export default IdeaLayout;
