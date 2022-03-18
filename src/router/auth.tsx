import {Route} from '@/types/Route';
import Login from '@/views/pages/auth/Login';
import Register from '@/views/pages/auth/Register';

const auth : Route[] = [
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default auth;
