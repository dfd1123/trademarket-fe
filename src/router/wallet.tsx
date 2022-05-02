import { Navigate, Outlet } from 'react-router';
import { Route } from '@/types/Route';
import Wallet from '@/views/pages/wallet/Wallet';
import MyAsset from '@/views/pages/wallet/myAsset/MyAsset';
import WalletHistory from '@/views/pages/wallet/history/WalletHistory';
import WalletConvert from '@/views/pages/wallet/convert/WalletConvert';

const user: Route[] = [
  {
    path: '/wallet',
    element: <Wallet />, 
    meta:{theme: 'blue'},
    children: [
        {path: 'asset', element: <MyAsset />, meta:{theme: 'blue'}},
        {path: 'history', element: <WalletHistory />, meta:{theme: 'blue'}},
        {path: 'convert', element: <WalletConvert />, meta:{theme: 'blue'}},
    ]
  },
];

export default user;
