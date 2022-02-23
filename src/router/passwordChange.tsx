import { Route } from '@/types/Route';
import PasswordChange from '@/views/pages/passwordChange/PasswordChange';

const passwordChange: Route[] = [
  {
    path: '/passwordChange',
    element: <PasswordChange />,
    meta: {
      isAuth: true,
    },
  },
];

export default passwordChange;
