import { observer } from "mobx-react-lite";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { cookie } from "../../utils/cookie";
import { DndProvider, SortableProvider } from "../DND";
import Helper from "../Helper/Helper";
import { Sidebar } from "../Sidebar";

const RootLayout = observer(() => {
  const uid = cookie.getCookie("uid");
  const isLogin = authStore.isLogin;

  return (
    <DndProvider>
      <Sidebar />
      <SortableProvider>
        <main className="ml-64 h-[100vh] bg-background pt-10 text-foreground">
          <div className="mx-auto max-w-[550px]">
            <Suspense fallback={<div>Loading...</div>}>
              {uid && isLogin ? <Outlet /> : <Navigate to="/login" replace />}
            </Suspense>
          </div>
        </main>
      </SortableProvider>
      <Helper />
    </DndProvider>
  );
});

export default RootLayout;
