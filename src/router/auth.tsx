import {Route} from '@/types/Route';
import Register from '@/views/pages/auth/Register';

const auth : Route[] = [
  {
    path: '/register',
    element: <Register />
  }
];

export default auth;
