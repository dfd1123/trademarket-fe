import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/store";
import { useLocation } from "react-router";
import useModal from "@/hooks/useModal";
import styled from "styled-components";
import Portal from "@/views/components/common/Portal";
import ModalComponent from "@/views/components/common/modal/ModalComponent";
import { resetModal } from "@/store/modal/modal";

const ModalContainer = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { scrollRelease } = useModal();
  const modals = useTypedSelector(
    (state) => state.modalSlice.modals,
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );

  useEffect(() => {
    dispatch(resetModal({ scrollRelease }));
  }, [pathname]);

  return (
    <Portal elementId="modal-root">
      <ModalContainerStyle>
        {modals.map((modal) => (
          <ModalComponent key={modal.id} modal={modal} />
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

  > button {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000000;
  }
`;

export default ModalContainer;
