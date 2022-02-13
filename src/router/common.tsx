import {Navigate} from 'react-router-dom';
import {Route} from '@/types/Route';
import NotFound from '@/views/pages/NotFound';
import ErrorPage from '@/views/pages/ErrorPage';
import Home from '@/views/pages/Home';
import CommonComponents from '@/views/pages/CommonComponents';
import BusinessInfo from '@/views/pages/kmf/BusinessInfo';

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
    path: '/common', 
    element: <CommonComponents />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  },
  {
    path: '/info', 
    element: <BusinessInfo />,
    meta:{
      // isAuth: true,
      headerHide: true,
      footerHide: true,
    },
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
