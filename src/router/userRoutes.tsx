import {Navigate} from 'react-router-dom';
import {Route} from '@/types/route';
import Test1 from '@/views/pages/Test1';
import Test2 from '@/views/pages/Test2';

const mainRoutes : Route[] = [
  {
    path: '/test1',
    element: <Test1 />
  },
  {
    path: '/test2',
    element: <Test2 />
  }
];

export default mainRoutes;
