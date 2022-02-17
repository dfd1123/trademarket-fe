import useModal from "@/hooks/useModal";
import { useDispatch } from "react-redux";
import { ToastType } from "@/store/modal/types/toast";
import { addToast, removeToast } from "@/store/modal/toast";
import { removeModal } from "@/store/modal/modal";

interface ToastOption {
  type?: "success" | "warning";
  duration?: number;
}

const useToast = () => {
  const dispatch = useDispatch();

  const toast = (
    msg: string,
    options: ToastOption | undefined = {
      type: "warning",
      duration: 1000,
    }
  ) => {
    let { type, duration } = options;

    const toast: ToastType = {
      id: -1,
      msg,
      type: type ?? 'warning',
      duration: duration ?? 1000,
    };

    dispatch(addToast({ toast }));
  };

  const closeToast = (id: number): void => {
    dispatch(removeToast({ id }));
  };

  return { toast, closeToast };
};

export default useToast;
