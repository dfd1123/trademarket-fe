import UserService from '@/services/UserService';
import useToast, { ToastOption } from '@/hooks/useToast';
import ApiConnection from '@/modules/ApiConnection';
import ReferenceService from '@/services/ReferenceService';
import NoticeService from '@/services/NoticeService';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from '@/store/info/infoReducer';


const useService = () => {
  const {toast} : {toast: (msg: string, options?: ToastOption) => void} = useToast();
  const dispatch = useDispatch();
  const setLoadStatus = (status : boolean) => dispatch(setLoadingStatus({status}));

  const api: ApiConnection = new ApiConnection({toast, setLoadStatus});

  const services = {
    user: new UserService(api),
    reference: new ReferenceService(api),
    notice: new NoticeService(api)
  };

  return {...services};
};

export default useService;
