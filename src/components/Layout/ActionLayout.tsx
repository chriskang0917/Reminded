import { Outlet } from "react-router-dom";
import { ActionBar } from "../Sidebar/ActionBar";

function ActionLayout() {
  return (
    <>
      <ActionBar />
      <Outlet />
    </>
  );
}

export default ActionLayout;
