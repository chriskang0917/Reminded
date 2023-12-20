import { Spinner } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { cookie } from "../../utils/cookie";
import { DndProvider, SortableProvider } from "../DND";
import Helper from "../Helper/Helper";
import { QuickInputModal } from "../Input/QuickInput";
import { Sidebar } from "../Sidebar";

const RootLayout = observer(() => {
  const uid = cookie.getCookie("uid");
  const isLogin = authStore.isLogin;

  const Loading = () => <Spinner className="w-10" />;

  return (
    <DndProvider>
      <Sidebar />
      <SortableProvider>
        <main className="ml-64 h-[100vh] bg-background pt-10 text-foreground">
          <div className="mx-auto max-w-[550px]">
            <Suspense fallback={<Loading />}>
              {uid && isLogin ? <Outlet /> : <Navigate to="/login" replace />}
            </Suspense>
          </div>
        </main>
      </SortableProvider>
      <QuickInputModal />
      <Helper />
    </DndProvider>
  );
});

export default RootLayout;
