import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { cookie } from "../../utils/cookie";
import Sidebar from "../Sidebar";

const RootLayout = observer(() => {
  const uid = cookie.getCookie("uid");
  const isLogin = authStore.isLogin;

  return (
    <>
      <Sidebar />
      {uid && isLogin ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
});

export default RootLayout;
