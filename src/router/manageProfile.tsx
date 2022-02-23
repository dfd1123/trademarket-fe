import { Route } from '@/types/Route';
import ManageProfile from '@/views/pages/manageProfile/ManageProfile';

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
