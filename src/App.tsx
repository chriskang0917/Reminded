import { NextUIProvider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ActionLayout from "./components/Layout/ActionLayout";
import IdeaLayout from "./components/Layout/IdeaLayout";
import NotesLayout from "./components/Layout/NotesLayout";
import RootLayout from "./components/Layout/RootLayout";
import TodoLayout from "./components/Layout/TodoLayout";
import ActionPage from "./pages/ActionPage";
import ArticlePage from "./pages/ArticlePage";
import IdeaPage from "./pages/IdeaPage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/Profile";
import Homepage from "./pages/TodayPage";
import TodoPage from "./pages/TodoPage";
import { authStore } from "./store/authStore";
import { cardStore } from "./store/cardStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "todo",
        element: <TodoLayout />,
        children: [{ path: ":route", element: <TodoPage /> }],
      },
      {
        path: "idea",
        element: <IdeaLayout />,
        children: [{ path: ":route", element: <IdeaPage /> }],
      },
      {
        path: "action",
        element: <ActionLayout />,
        children: [
          {
            path: ":route",
            element: <ActionPage />,
          },
        ],
      },
      {
        path: "notes",
        element: <NotesLayout />,
        children: [
          {
            path: "article/:id",
            element: <ArticlePage />,
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
    authStore.initUserSettings();
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
