import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Compare } from "./pages/Compare";
import { Contact } from "./pages/Contact";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "search", Component: Search },
      { path: "compare", Component: Compare },
      { path: "contact", Component: Contact },
      { path: "favorites", Component: Favorites },
      { path: "*", Component: NotFound },
    ],
  },
]);