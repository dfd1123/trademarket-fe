import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { addModal, removeModal } from '@/store/modal/modal';
import { ModalType } from '@/store/modal/types/modal';
import { useTypedSelector } from '@/store';

interface ModalOption {
  props?: any;
      nonModal?: boolean;
      duplicateCheck?: boolean;
      animation:{
        in: boolean;
        class: string;
        duration?: number;
      }
}

interface ModalHookReturn {
  openModal: (
    component: FunctionComponent,
    options?: ModalOption,
  ) => Promise<any>;
  closeModal: (id: number) => void;
  resolveModal: (modal: ModalType, result: any) => void;
  checkModal: (
    component: FunctionComponent,
    onlyLastCheck?: boolean
  ) => boolean;
  scrollRelease:() => void;
}

const useModal = (): ModalHookReturn => {
  const dispatch = useDispatch();

  const openModal = (
    component: FunctionComponent,
    options: ModalOption = {
      props: {},
      animation:{
        in: false,
        class:'',
        duration: 200000
      },
      nonModal: false,
      duplicateCheck: false,
    }
  ): Promise<unknown> => {
    let { props, nonModal, animation, duplicateCheck } = options;
    nonModal = Boolean(nonModal);
    scrollFreeze(nonModal);

    return new Promise<any>((resolve, reject) => {
      const modal: ModalType = {
        id: -1,
        props,
        component,
        nonModal,
        animation,
        resolve,
        reject,
      };

      dispatch(addModal({ modal, duplicateCheck }));
    });
  };

  const closeModal = (id: number): void => {
    dispatch(removeModal({ id, scrollRelease }));
  };

  const resolveModal = (modal: ModalType, result: any): void => {
    modal.resolve(result);
    closeModal(modal.id);
  };

  const checkModal = (
    component: FunctionComponent,
    onlyLastCheck: boolean = false
  ) => {
    const modals = useTypedSelector((state) => state.modalSlice.modals);
    if (onlyLastCheck)
      return modals.length > 0
        ? modals[modals.length - 1].component.name === component.name
        : false;
    else return modals.some((m) => m.component.name === component.name);
  };

  const scrollFreeze = (nonModal: boolean) => {
    if (!nonModal) document.body.style.overflow = 'hidden';
  };

  const scrollRelease = () => {
    document.body.style.overflow = '';
  };

  return { openModal, closeModal, resolveModal, checkModal, scrollRelease };
};

export default useModal;
