import {Route} from '@/types/Route';
import UserGuide from '@/views/pages/helpCenter/UserGuide';
import Deposit from '@/views/pages/helpCenter/Deposit';
import Withdraw from '@/views/pages/helpCenter/Withdraw'
import SubmitRequest from '@/views/pages/helpCenter/SubmitRequest';

const helpCenter : Route[] = [
  {
    path: '/user-guide',
    element: <UserGuide />
  },
  {
    path: '/deposit',
    element: <Deposit />
  },
  {
    path: '/withdraw',
    element: <Withdraw />
  },
  {
    path: '/submit-request',
    element: <SubmitRequest />
  },
];

export default helpCenter;
