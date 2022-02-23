import { Navigate } from 'react-router';
import NotFound from '@/views/pages/NotFound';
import ErrorPage from '@/views/pages/ErrorPage';
import CommonComponents from '@/views/pages/CommonComponents';
import {Route} from '@/types/Route';

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
    element: <Navigate to='/notice' />
  },
  {
    path: '/common', 
    element: <CommonComponents />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  },
  {
    path: '/404',
    element: <NotFound />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  },
  {
    path: '/500',
    element: <ErrorPage />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  }
];

export default common;
