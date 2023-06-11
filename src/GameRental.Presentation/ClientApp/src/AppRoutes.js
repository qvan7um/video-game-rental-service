import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { FetchContracts } from "./admin/FetchContracts";
import { Home } from "./components/Home";
import { Explore } from "./user/Explore";
import { AddGame } from "./admin/AddGame";
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
    path: '/explore',
    element: <Explore  />
  },
  { 
    path: '/contracts',
    element: <FetchContracts />
  },
  { 
    path: '/addgame',
    element: <AddGame />
  }
];

export default AppRoutes;
