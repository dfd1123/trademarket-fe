import { Navigate, Outlet } from 'react-router';
import { Route } from '@/types/Route';
import Wallet from '@/views/pages/wallet/Wallet';
import MyAsset from '@/views/pages/wallet/myAsset/MyAsset';
import WalletHistory from '@/views/pages/wallet/history/WalletHistory';
import WalletConvert from '@/views/pages/wallet/convert/WalletConvert';
import WalletFutureTrade from '@/views/pages/wallet/futureTrade/WalletFutureTrade';
import DepositWithdraw from '@/views/pages/wallet/depositWithdraw/DepositWithdraw';

const user: Route[] = [
  {
    path: '/wallet',
    element: <Wallet />, 
    meta:{theme: 'blue', isAuth: true},
    children: [
        {path: 'asset', element: <MyAsset />, meta:{theme: 'blue', isAuth: true}},
        {path: 'history', element: <WalletHistory />, meta:{theme: 'blue', isAuth: true}},
        {path: 'convert', element: <WalletConvert />, meta:{theme: 'blue', isAuth: true}},
        {path: 'depositWithdraw', element: <DepositWithdraw />, meta:{theme: 'blue', isAuth: true}},
        {path: 'future-trade', element: <WalletFutureTrade />, meta:{theme: 'blue', isAuth: true}},
    ]
  },
];

export default user;
