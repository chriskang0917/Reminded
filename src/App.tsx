import { NextUIProvider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ActionLayout from "./components/Layout/ActionLayout";
import IdeaLayout from "./components/Layout/IdeaLayout";
import RootLayout from "./components/Layout/RootLayout";
import ActionPage from "./pages/ActionPage";
import ErrorPage from "./pages/ErrorPage";
import IdeaPage from "./pages/IdeaPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/Profile";
import Homepage from "./pages/TodayPage";
import { authStore } from "./store/authStore";
import { cardStore } from "./store/cardStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { path: "todo", element: <section>Todo</section> },
      {
        path: "idea",
        element: <IdeaLayout />,
        children: [{ path: ":route", element: <IdeaPage /> }],
      },
      {
        path: "action",
        element: <ActionLayout />,
        children: [{ path: ":route", element: <ActionPage /> }],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "setting",
        element: <section>Profile</section>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const App = observer(() => {
  useEffect(() => {
    if (!authStore.uid) return authStore.initAuthState();
    authStore.initState();
    cardStore.initCards();
  }, [authStore.uid]);

  return (
    <NextUIProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  );
});

export default App;
