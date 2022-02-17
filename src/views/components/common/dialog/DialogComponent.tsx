import { DialogType } from "@/store/modal/types/dialog";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Component from "@/views/components/common/Component";
import Alert from "@/views/components/common/dialog/Alert";
import Confirm from "@/views/components/common/dialog/Confirm";
import Prompt from "@/views/components/common/dialog/Prompt";
import useDialog from "@/hooks/useDialog";

interface PropsType {
  dialog: DialogType;
}

const DialogComponent = ({ dialog }: PropsType) => {
  const [open, setOpen] = useState(false);
  const { closeDialog, resolveDialog } = useDialog();
  const animationDuration = 250;
  let component = Alert;

  if (dialog.type === "confirm") {
    component = Confirm;
  } else if (dialog.type === "prompt") {
    component = Prompt;
  }

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      closeDialog();
    }, animationDuration);
  };

  const resolve = (result: any) => {
    setOpen(false);
    setTimeout(() => {
      resolveDialog(dialog, result);
    }, animationDuration);
  };

  useEffect(() => {
    setOpen(true);

    const preventGoBack = () => {
      history.go(1);
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
        history.go(-1);
        window.removeEventListener("popstate", preventGoBack);
    }
  }, []);

  return (
    <DialogComponentStyle animationDuration={animationDuration}>
      <CSSTransition in={open} timeout={animationDuration} classNames="dialog">
        <Component
          is={component}
          props={{
            ...dialog,
            close,
            resolve,
          }}
        />
      </CSSTransition>
    </DialogComponentStyle>
  );
};

const DialogComponentStyle = styled.div<{ animationDuration: number }>`
  > div {
    opacity: 0;
    .cont {
      opacity: 0;
    }

    &.dialog-enter {
        opacity: 0;
      .cont {
        opacity: 0;
        transform: scale3d(1.1, 1.1, 1.1);
      }
      &-active {
          opacity: 1;
          transition: opacity ${(props) => props.animationDuration || 0}ms;
        .cont {
          opacity: 1;
          transform: scale3d(1, 1, 1);
          transition: opacity ${(props) => props.animationDuration || 0}ms,
            transform ${(props) => props.animationDuration || 0}ms;
        }
      }
      &-done {
        opacity: 1;
        .cont {
          opacity: 1;
          transform: scale3d(1, 1, 1);
        }
      }
    }
    &.dialog-exit {
        opacity: 1;
      .cont {
        opacity: 1;
      }
      &-active {
        opacity: 0;
          transition: opacity ${(props) => props.animationDuration || 0}ms;
        .cont {
          opacity: 0;
          transition: opacity ${(props) => props.animationDuration || 0}ms;
        }
      }
    }
  }
`;

export default DialogComponent;
