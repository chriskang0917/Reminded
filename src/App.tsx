import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IdeaLayout from "./components/IdeaLayout";
import RootLayout from "./components/RootLayout";
import Homepage from "./pages/Homepage";
import IdeaSearch from "./pages/IdeaPage/IdeaSearch";
import IdeaThisWeek from "./pages/IdeaPage/IdeaThisWeek";

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
          { path: "search", element: <IdeaSearch /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  );
}

export default App;
