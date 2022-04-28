import { Navigate, Outlet } from 'react-router';
import { Route } from '@/types/Route';
import MyAsset from '@/views/pages/wallet/myAsset/MyAsset';
import WalletHistory from '@/views/pages/wallet/history/WalletHistory';
import Wallet from '@/views/pages/wallet/Wallet';

const user: Route[] = [
  {
    path: '/wallet',
    element: <Wallet />, 
    meta:{theme: 'blue'},
    children: [
        {path: 'asset', element: <MyAsset />, meta:{theme: 'blue'}},
        {path: 'history', element: <WalletHistory />, meta:{theme: 'blue'}},
    ]
  },
];

export default user;
