import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { cookie } from "../../utils/cookie";
import Sidebar from "../Sidebar";

const RootLayout = observer(() => {
  const uid = cookie.getCookie("uid");

  return (
    <>
      <Sidebar />
      {uid ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
});

export default RootLayout;
