import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";
import Sidebar from "../Sidebar";

const RootLayout = observer(() => {
  const uid = authStore.uid;

  return (
    <>
      <Sidebar />
      {uid ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
});

export default RootLayout;
