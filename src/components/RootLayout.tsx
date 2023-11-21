import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function RootLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default RootLayout;
