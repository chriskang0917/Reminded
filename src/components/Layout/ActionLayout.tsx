import { Outlet } from "react-router-dom";
import { ActionBar } from "../Sidebar";
import MainBackdrop from "./MainBackdrop";

function ActionLayout() {
  return (
    <>
      <ActionBar />
      <MainBackdrop>
        <Outlet />
      </MainBackdrop>
    </>
  );
}

export default ActionLayout;
