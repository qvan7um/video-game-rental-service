import { Counter } from "./components/Counter";
import Games from "./admin/Games";
import { Home } from "./components/Home";
import { Explore } from "./user/Explore";
import SearchPage from "./user/SearchPage";
import RentGame from "./user/RentGame";
import { AddGame} from "./admin/AddGame";
import { Contracts } from "./admin/Contracts";
import { AddContract } from "./admin/AddContract";
import EditGame from "./admin/EditGame";

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
    element: <Explore />
  },
  {
    path: '/addgame',
    element: <AddGame />
  },
  {
    path: '/edit/:gameId',
    element: <EditGame />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/rent',
    element: <RentGame />
  },
  {
    path: '/contracts',
    element: <Contracts />
  },
  {
    path: '/addcontract',
    element: <AddContract />
  }
];

export default AppRoutes;
