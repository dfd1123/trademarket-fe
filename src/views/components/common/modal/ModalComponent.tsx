import { ModalType } from "@/store/modal/types/modal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Component from "@/views/components/common/Component";
import useModal from "@/hooks/useModal";

interface PropsType {
  modal: ModalType;
}

const ModalComponent = ({ modal }: PropsType) => {
  const [open, setOpen] = useState(false);
  const { closeModal, resolveModal } = useModal();

  const close = (modal: ModalType) => {
      setOpen(false);
      setTimeout(() => {
        closeModal(modal.id);
      }, modal.animation.duration || 0);
  };

  const resolve = (modal: ModalType, result: any) => {
    setOpen(false);
    setTimeout(() => {
        resolveModal(modal, result)
      }, modal.animation.duration || 0);
  }

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <ModalComponentStyle modal={modal}>
      <CSSTransition
        in={open}
        timeout={modal.animation.duration || 0}
        classNames={modal.animation.class || 'fade'}
      >
        <Component
          is={modal.component}
          key={modal.id}
          props={{
            ...modal.props,
            nonModal: modal.nonModal,
            close: () => close(modal),
            resolve: (result: any) => resolve(modal, result),
          }}
        />
      </CSSTransition>
    </ModalComponentStyle>
  );
};

const ModalComponentStyle = styled.div<{modal: ModalType}>`
  > div {
    opacity: 0;

    &.fade-enter {
      opacity: 0;
      &-active {
        opacity: 1;
        transition: opacity ${(props) => props.modal.animation.duration || 0}ms;
      }
      &-done {
        opacity: 1;
      }
    }
    &.fade-exit {
      opacity: 1;
      &-active {
        opacity: 0;
        transition: opacity ${(props) => props.modal.animation.duration || 0}ms;
      }
    }
  }
`;

export default ModalComponent;
