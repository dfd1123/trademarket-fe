import { useEffect, useState } from "react";
import styled from "styled-components";
import useToast from "@/hooks/useToast";
import { CSSTransition } from "react-transition-group";
import { ToastType } from "@/store/modal/types/toast";
import { TABLET_SIZE } from "@/assets/styles/responsiveBreakPoint";

interface PropsType {
  toast: ToastType;
}

const ToastComponent = ({ toast }: PropsType) => {
  const [open, setOpen] = useState(false);
  const { closeToast } = useToast();
  const animationDuration = 400;

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      closeToast(toast.id);
    }, animationDuration);
  };

  useEffect(() => {
    setOpen(true);

    setTimeout(() => {
      close();
    }, (toast.duration ?? 0) + animationDuration);

    return () => closeToast(toast.id);
  }, []);

  return (
    <ToastComponentStyle toast={toast} animationDuration={animationDuration}>
      <CSSTransition in={open} timeout={animationDuration} classNames="toast">
        <div className={`toast ${toast.type}`} onClick={close}>
          <span>{toast.msg}</span>
        </div>
      </CSSTransition>
    </ToastComponentStyle>
  );
};

const ToastComponentStyle = styled.div<{
  toast: ToastType;
  animationDuration: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  > div {
    margin-top: 10px;
    cursor: pointer;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(-20px);

    &.toast {
      border-radius: 20px;
      padding: 10px 20px;

      &.warning {
        color: #fff;
        background-color: red;
      }

      &.success {
        color: #fff;
        background-color: #00b600;
      }
    }

    &.toast-enter {
      opacity: 0;
      transform: translateY(-20px);
      &-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
      &-done {
        opacity: 1;
        transform: translateY(0px);
      }
    }
    &.toast-exit {
      opacity: 1;
      transform: translateY(0px);
      &-active {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
      flex-direction: column-reverse;
    > div {
      &.toast {
        border-radius: 20px;
        padding: 10px 20px;
        background-color: rgba(0, 0, 0, 0.8) !important;

        &.warning {
          color: #fff;
          border: 1px solid red;
        }

        &.success {
          color: #fff;
          border: 1px solid #00b600;
        }
      }
    }

    &.toast-enter {
      opacity: 0;
      transform: translateY(0px);
      &-active {
        opacity: 1;
        transform: translateY(20px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
      &-done {
        opacity: 1;
        transform: translateY(20px);
      }
    }
    &.toast-exit {
      opacity: 1;
      transform: translateY(20px);
      &-active {
        opacity: 0;
        transform: translateY(0px);
        transition: opacity ${(props) => props.animationDuration}ms,
          transform ${(props) => props.animationDuration}ms;
      }
    }
  }
`;

export default ToastComponent;
