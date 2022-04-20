import _debounce from 'lodash/debounce';
import useModal from '@/hooks/useModal';
import { useDispatch } from 'react-redux';
import { ToastType } from '@/store/modal/types/toast';
import { addToast, removeToast } from '@/store/modal/toast';
import { removeModal } from '@/store/modal/modal';

export interface ToastOption {
  type?: 'success' | 'warning';
  duration?: number;
}

export interface ToastFunctionType {
  toast: (msg: string, options?: ToastOption) => void;
}

const useToast = () => {
  const dispatch = useDispatch();

  const toast = _debounce((
    msg: string,
    options: ToastOption | undefined = {
      type: 'warning',
      duration: 2000,
    }
  ) => {
    let { type, duration } = options;

    const toast: ToastType = {
      id: -1,
      msg,
      type: type ?? 'warning',
      duration: duration ?? 2000,
    };

    dispatch(addToast({ toast }));
  }, 1);

  const closeToast = (id: number): void => {
    dispatch(removeToast({ id }));
  };

  return { toast, closeToast };
};

export default useToast;
