import { useEffect, useState } from 'react';
import Component from '@/views/components/common/Component';
import Portal from '@/views/components/common//Portal';
import useModal from '@/hooks/useModal';
import { useTypedSelector } from '@/store';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const ModalContainer = () => {
  const [open, setOpen] = useState(false);
  const { closeModal, resolveModal } = useModal();
  const modals = useTypedSelector((state) => state.modalSlice.modals, (a, b) => JSON.stringify(a) === JSON.stringify(b));

  // useEffect(() => {
  //   setOpen(true);
  //   return () => {
  //     setOpen(false);
  //   }
  // }, []);

  return (
    <Portal elementId="modal-root">
        <ModalContainerStyle>
          <button onClick={() => setOpen(true)}>awdawdawd</button>
          {modals.map((modal) => (
            <CSSTransition key={modal.id} in={open} timeout={modal.animation.duration || 0} classNames={modal.animation.class} className="fade">
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
            </CSSTransition>
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

  >button{position:fixed; top:0; left:0; z-index: 10000000;}

  >div{
    transition: all 2000ms;
  }

  .fade-enter {
    opacity: 0;
    &-active{
      opacity: 1;
    }
  }

  .fade-exit {
    opacity: 1;
    &-active{
      opacity: 0;
    }
  }
`;

export default ModalContainer;
