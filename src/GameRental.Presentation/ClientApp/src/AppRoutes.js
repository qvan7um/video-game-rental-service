import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { Home } from "./components/Home";
import { Explore } from "./user/Explore";
import SearchPage from "./user/SearchPage";
import RentGame from "./user/RentGame";
import { AddGame} from "./admin/AddGame";
import { Contracts } from "./admin/Contracts";
import { AddContract } from "./admin/AddContract";
import { EditContract } from "./admin/EditContract";
import { DetailContract } from "./admin/DetailContract";

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
  },
  {
    path: '/contracts/edit',
    element: <EditContract />
  },
  {
    path: '/contracts/detail',
    element: <DetailContract />
  }

];

export default AppRoutes;
