import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ActionLayout from "./components/Layout/ActionLayout";
import IdeaLayout from "./components/Layout/IdeaLayout";
import RootLayout from "./components/Layout/RootLayout";
import ActionPage from "./pages/ActionPage/ActionPage";
import Homepage from "./pages/Homepage";
import IdeaSearchPage from "./pages/IdeaPage/IdeaSearchPage";
import IdeaThisWeek from "./pages/IdeaPage/IdeaThisWeek";
import { cardStore } from "./store/cardStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { path: "todo", element: <section>Todo</section> },
      {
        path: "idea",
        element: <IdeaLayout />,
        children: [
          { path: "week", element: <IdeaThisWeek /> },
          { path: "search", element: <IdeaSearchPage /> },
        ],
      },
      {
        path: "action",
        element: <ActionLayout />,
        children: [{ path: ":type", element: <ActionPage /> }],
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    cardStore.getCardsWithFireStore();
    cardStore.getUserSettings();
  }, []);

  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  );
}

export default App;
