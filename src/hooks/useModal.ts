import { useContext } from 'react';
import { ModalContext, ModalContextType } from '@/provider/ModalProvider';

const useModal = () : ModalContextType => {
    return useContext(ModalContext);
};

export default useModal;