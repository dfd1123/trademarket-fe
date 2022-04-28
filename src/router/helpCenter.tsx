import { Route } from "@/types/Route";
import UserGuide from "@/views/pages/helpCenter/UserGuide";
import Deposit from "@/views/pages/helpCenter/Deposit";
import Withdraw from "@/views/pages/helpCenter/Withdraw";
import SubmitRequest from "@/views/pages/helpCenter/SubmitRequest";
import SubmitRequestDetail from "@/views/pages/helpCenter/SubmitRequestDetail";
import SubmitRequestWrite from "@/views/pages/helpCenter/SubmitRequestWrite";

const helpCenter: Route[] = [
  {
    path: "/user-guide",
    element: <UserGuide />,
    meta:{theme: 'light'}
  },
  {
    path: "/deposit",
    element: <Deposit />,
    meta:{theme: 'light'}
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
    meta:{theme: 'light'}
  },
  {
    path: "/submit-request",
    element: <SubmitRequest />,
    meta:{theme: 'light'}
  },
  {
    path: "/submit-request/:id",
    element: <SubmitRequestDetail />,
    meta:{theme: 'light'}
  },
  {
    path: "/submit-request/write",
    element: <SubmitRequestWrite />,
    meta:{theme: 'light'}
  },
];

export default helpCenter;
