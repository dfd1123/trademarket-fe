import {Navigate} from 'react-router-dom';
import {Route} from '@/types/Route';
import Test1 from '@/views/pages/Test1';
import Test2 from '@/views/pages/Test2';

const user : Route[] = [
  {
    path: '/test1',
    element: <Test1 />,
    meta: {
      theme: 'dark'
    }
  },
  {
    path: '/test2',
    element: <Test2 />,
    meta:{
      isAuth: true
    }
  }
];

export default user;
