import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { cookie } from "../../utils/cookie";
import { DndProvider, SortableProvider } from "../DND";
import { Sidebar } from "../Sidebar";

const RootLayout = observer(() => {
  const uid = cookie.getCookie("uid");
  const isLogin = authStore.isLogin;

  return (
    <DndProvider>
      <Sidebar />
      <SortableProvider>
        <main className="ml-20 mt-10 h-[100vh] bg-background text-foreground">
          {uid && isLogin ? <Outlet /> : <Navigate to="/login" replace />}
        </main>
      </SortableProvider>
    </DndProvider>
  );
});

export default RootLayout;
