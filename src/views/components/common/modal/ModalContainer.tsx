import Component from '@/views/components/common/Component';
import Portal from '@/views/components/common//Portal';
import useModal from '@/hooks/useModal';
import { useTypedSelector } from '@/store';
import styled from 'styled-components';

const ModalContainer = () => {
  const { closeModal, resolveModal } = useModal();
  const modals = useTypedSelector((state) => state.modalSlice.modals, (a, b) => JSON.stringify(a) === JSON.stringify(b));

  return (
    <Portal elementId="modal-root">
      <ModalContainerStyle>
        {modals.map((modal) => (
          <Component
            is={modal.component}
            key={modal.id}
            props={{
              ...modal.props,
              nonModal: modal.nonModal,
              close: () => closeModal(modal.id),
              resolve: (result: any) => resolveModal(modal, result),
            }}
          />
        ))}
      </ModalContainerStyle>
    </Portal>
  );
};

const ModalContainerStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export default ModalContainer;
