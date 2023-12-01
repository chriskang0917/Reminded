import { Outlet } from "react-router-dom";
import { ActionBar } from "../Sidebar";

function ActionLayout() {
  return (
    <>
      <ActionBar />
      <Outlet />
    </>
  );
}

export default ActionLayout;
