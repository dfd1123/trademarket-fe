import { FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addModal, removeModal, resetModal } from '@/store/modal/modal';
import { ModalType } from '@/store/modal/types/modal';
import { useTypedSelector } from '@/store';

interface ModalHookReturn {
  openModal: (
    component: FunctionComponent,
    options?: {
      props?: any;
      nonModal?: boolean;
      duplicateCheck: boolean;
    }
  ) => Promise<any>;
  closeModal: (id: number) => void;
  resolveModal: (modal: ModalType, result: any) => void;
  checkModal: (
    component: FunctionComponent,
    onlyLastCheck?: boolean
  ) => boolean;
}

const useModal = (): ModalHookReturn => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(resetModal({scrollRelease}));
  }, [pathname]);

  const openModal = (
    component: FunctionComponent,
    options: { props?: any; nonModal?: boolean; duplicateCheck?: boolean } = {
      props: null,
      nonModal: false,
      duplicateCheck: false,
    }
  ): Promise<unknown> => {
    let { props, nonModal, duplicateCheck } = options;
    nonModal = Boolean(nonModal);
    scrollFreeze(nonModal);

    return new Promise((resolve, reject) => {
      const modal: ModalType = {
        id: -1,
        props,
        component,
        nonModal,
        resolve,
        reject,
      };

      dispatch(addModal({ modal, duplicateCheck }));
    });
  };

  const closeModal = (id: number): void => {
    dispatch(removeModal({ id, scrollRelease }));
  };

  const resolveModal = <T extends {}>(modal: ModalType, result: T): void => {
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

  return { openModal, closeModal, resolveModal, checkModal };
};

export default useModal;
