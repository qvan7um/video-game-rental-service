import { Counter } from "./components/Counter";
import { Games } from "./admin/Games";
import { Home } from "./components/Home";

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
  }
];

export default AppRoutes;
