import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { FetchContracts } from "./admin/FetchContracts";
import { Home } from "./components/Home";

import SearchPage from "./user/SearchPage";
import RentGame from "./user/RentGame";


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
    path: '/contracts',
    element: <FetchContracts />
  },
  {
    path: '/rent',
    element: <RentGame />
  }
];

export default AppRoutes;
