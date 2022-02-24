import { Route } from '@/types/Route';
import ManageProfile from '@/views/pages/myPage/manageProfile/ManageProfile';

const manageProfile: Route[] = [
  {
    path: '/manageProfile',
    element: <ManageProfile />,
    meta: {
      isAuth: true,
    },
  },
];

export default manageProfile;
