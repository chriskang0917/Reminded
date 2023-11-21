import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IdeaLayout from "./components/IdeaLayout";
import RootLayout from "./components/RootLayout";
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
      {
        path: "idea",
        element: <IdeaLayout />,
        children: [
          { path: "week", element: <IdeaThisWeek /> },
          { path: "search", element: <IdeaSearchPage /> },
        ],
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    cardStore.getCards();
    cardStore.getUserSettings();
  }, []);

  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  );
}

export default App;
