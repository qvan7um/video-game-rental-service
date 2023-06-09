import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { Home } from "./components/Home";
import { Explore } from "./user/Explore";

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
  }
];

export default AppRoutes;
