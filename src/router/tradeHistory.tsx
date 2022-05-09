import { Navigate, Outlet } from 'react-router';
import { Route } from '@/types/Route';
import ExecutionHistory from '@/views/pages/tradeHistory/executionList/ExecutionHistory';
import History from '@/views/pages/tradeHistory/History';
import OrderDetailHistory from '@/views/pages/tradeHistory/orderDetailExecutionList/OrderDetailHistory';
import CloseExecutionHistory from '@/views/pages/tradeHistory/closeExecutionList/CloseExecutionHistory';

const user: Route[] = [
  {
    path: '/history',
    element: <History />, 
    meta:{theme: 'blue', isAuth: true},
    children: [
        {path: 'execution-list', element: <ExecutionHistory />, meta:{theme: 'blue', isAuth: true}},
        {path: 'order-execution-list', element: <OrderDetailHistory />, meta:{theme: 'blue', isAuth: true}},
        {path: 'close-execution-list', element: <CloseExecutionHistory />, meta:{theme: 'blue', isAuth: true}},
    ]
  },
];

export default user;
