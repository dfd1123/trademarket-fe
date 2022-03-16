import useToast, { ToastOption } from '@/hooks/useToast';
import ApiConnection from '@/modules/ApiConnection';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from '@/store/info/infoReducer';
import CookieService from '@/services/CookieService';
import UserService from '@/services/UserService';
import RealTimeService from '@/services/RealTimeService';
import CoinInfoService from '@/services/CoinInfoService';
import { useContext } from 'react';
import { WebSocketContext } from '@/provider/WebSocketProvider';
import ChartService from '@/services/ChartService';

const useService = () => {
  const { toast }: { toast: (msg: string, options?: ToastOption) => void } =
    useToast();
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const cookie = new CookieService();

  const api: ApiConnection = new ApiConnection({
    cookie,
    toast,
  });

  const serviceParams = {
    ws: ws,
    cookie: cookie,
    dispatch,
  };

  const services = {
    cookie: cookie,
    user: new UserService(serviceParams),
    realTime: new RealTimeService(serviceParams),
    coinInfo: new CoinInfoService(serviceParams),
    chart: new ChartService(serviceParams),
  };

  return { ...services };
};

export default useService;
