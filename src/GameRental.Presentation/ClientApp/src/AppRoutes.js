import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { Home } from "./components/Home";
import SearchPage from "./client/SearchPage";
import RentGame from "./client/RentGame";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/games',
    element: <Games />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/rent',
    element: <RentGame />
  }
];

export default AppRoutes;
