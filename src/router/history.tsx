import { Route } from "@/types/Route";
import ExecutionList from "@/views/pages/history/ExecutionList";
import OeDetail from "@/views/pages/history/OeDetail";
import CeList from "@/views/pages/history/CeList";

const helpCenter: Route[] = [
  {
    path: "/execution-list",
    element: <ExecutionList />,
  },
  {
    path: "/order-execution",
    element: <OeDetail />,
  },
  {
    path: "/close-execution",
    element: <CeList />,
  },
];

export default helpCenter;
