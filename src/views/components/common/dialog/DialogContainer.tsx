import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/store";
import { useLocation } from "react-router";
import useDialog from "@/hooks/useDialog";
import styled from "styled-components";
import Portal from "@/views/components/common/Portal";
import DialogComponent from "@/views/components/common/dialog/DialogComponent";
import { removeDialog } from "@/store/modal/dialog";

const ModalContainer = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { scrollRelease } = useDialog();
  const dialog = useTypedSelector(
    (state) => state.dialogSlice.dialog,
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );

  useEffect(() => {
    dispatch(removeDialog({ scrollRelease }));
  }, [pathname]);

  return (
    <Portal elementId="dialog-root">
      {dialog ? (
        <DialogContainerStyle>
          <DialogComponent dialog={dialog} />
        </DialogContainerStyle>
      ) : (
        ""
      )}
    </Portal>
  );
};

const DialogContainerStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
`;

export default ModalContainer;
