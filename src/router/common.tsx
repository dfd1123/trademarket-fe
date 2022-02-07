import {Navigate} from 'react-router-dom';
import {Route} from '@/types/Route';
import NotFound from '@/views/pages/NotFound';
import ErrorPage from '@/views/pages/ErrorPage';
import Home from '@/views/pages/Home';

// ex
/*
const commonRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: '/', element: <MainView />},
      {path: '404', element: <PageNotFoundView />},
      {path: 'account', element: <Navigate to='/account/list' />},
    ],
  };
 */

const common : Route[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/500',
    element: <ErrorPage />
  }
];

export default common;
