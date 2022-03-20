import { Navigate } from 'react-router';
import { Route } from '@/types/Route';
import TradePage from '@/views/pages/trade/TradePage';

const user: Route[] = [
  {
    path: '/trade',
    element: <Navigate to="/trade/BTCUSDT" replace={true} />,
    meta:{
        theme: 'dark'
    }
  },
  {
    path: '/trade/:symbol',
    element: <TradePage />,
    meta:{
        theme: 'dark'
    }
  },
];

export default user;
