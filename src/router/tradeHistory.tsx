import { Navigate, Outlet } from 'react-router';
import { Route } from '@/types/Route';
import ExecutionHistory from '@/views/pages/tradeHistory/executionList/ExecutionHistory';
import History from '@/views/pages/tradeHistory/History';
import OrderDetailHistory from '@/views/pages/tradeHistory/orderDetailExecutionList/OrderDetailHistory';

const user: Route[] = [
  {
    path: '/history',
    element: <History />, 
    meta:{theme: 'blue'},
    children: [
        {path: 'execution-list', element: <ExecutionHistory />, meta:{theme: 'blue'}},
        {path: 'order-execution-list', element: <OrderDetailHistory />, meta:{theme: 'blue'}},
    ]
  },
];

export default user;
