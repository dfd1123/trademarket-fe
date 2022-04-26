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
  },
  {
    path: "/deposit",
    element: <Deposit />,
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
  },
  {
    path: "/submit-request",
    element: <SubmitRequest />,
  },
  {
    path: "/submit-request/:id",
    element: <SubmitRequestDetail />,
  },
  {
    path: "/submit-request/write",
    element: <SubmitRequestWrite />,
  },
];

export default helpCenter;
