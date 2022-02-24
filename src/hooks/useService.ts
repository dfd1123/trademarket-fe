import UserService from '@/services/UserService';
import useToast, { ToastOption } from '@/hooks/useToast';
import ApiConnection from '@/modules/ApiConnection';
import ReferenceService from '@/services/ReferenceService';
import NoticeService from '@/services/NoticeService';
import BusinessService from '@/services/BusinessService';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from '@/store/info/infoReducer';
import CookieService from '@/services/CookieService';

const useService = () => {
  const { toast }: { toast: (msg: string, options?: ToastOption) => void } =
    useToast();
  const dispatch = useDispatch();
  const setLoadStatus = (status: boolean) =>
    dispatch(setLoadingStatus({ status }));

  const cookie = new CookieService();

  const api: ApiConnection = new ApiConnection({
    toast,
    cookie,
    setLoadStatus,
  });

  const serviceParams = {
    api: api,
    cookie: cookie,
    dispatch,
  };

  const services = {
    cookie: cookie,
    user: new UserService(serviceParams),
    reference: new ReferenceService(serviceParams),
    notice: new NoticeService(serviceParams),
    business: new BusinessService(serviceParams),
  };

  return { ...services };
};

export default useService;
