import UserService from '@/services/UserService';
import useToast, { ToastOption } from '@/hooks/useToast';
import ApiConnection from '@/modules/ApiConnection';
import ReferenceService from '@/services/ReferenceService';

const useService = () => {
  const { toast }: { toast: (msg: string, options?: ToastOption) => void } =
    useToast();

  const api: ApiConnection = new ApiConnection({ toast });

  const services = {
    user: new UserService(api),
    reference: new ReferenceService(api),
  };

  return { ...services };
};

export default useService;
