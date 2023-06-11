import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { FetchContracts } from "./admin/FetchContracts";
import { Home } from "./components/Home";
import { Explore } from "./user/Explore";
import SearchPage from "./user/SearchPage";
import RentGame from "./user/RentGame";
import { AddGame} from "./admin/AddGame";

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
    path: '/contracts',
    element: <FetchContracts />
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/addgame',
    element: <AddGame />
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
