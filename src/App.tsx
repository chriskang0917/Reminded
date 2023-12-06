import { NextUIProvider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ActionLayout from "./components/Layout/ActionLayout";
import IdeaLayout from "./components/Layout/IdeaLayout";
import NotesLayout from "./components/Layout/NotesLayout";
import RootLayout from "./components/Layout/RootLayout";
import TodoLayout from "./components/Layout/TodoLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
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
      {
        path: "todo",
        element: <TodoLayout />,
        children: [
          { path: ":route", Component: lazy(() => import("./pages/TodoPage")) },
        ],
      },
      {
        path: "idea",
        element: <IdeaLayout />,
        children: [
          { path: ":route", Component: lazy(() => import("./pages/IdeaPage")) },
        ],
      },
      {
        path: "action",
        element: <ActionLayout />,
        children: [
          {
            path: ":route",
            Component: lazy(() => import("./pages/ActionPage")),
          },
        ],
      },
      {
        path: "notes",
        element: <NotesLayout />,
        children: [
          {
            path: "article/:id",
            Component: lazy(() => import("./pages/ArticlePage")),
          },
          { path: ":route", element: <NotesPage /> },
        ],
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
    cardStore.initActiveCards();
  }, [authStore.uid]);

  return (
    <NextUIProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </NextUIProvider>
  );
});

export default App;
