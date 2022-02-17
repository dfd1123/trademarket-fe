import styled from "styled-components";

interface PropsType {
  children: React.ReactNode;
}

const DialogTemplete = ({ children }: PropsType) => {
  return (
    <DialogTempleteStyle className="dialog">
      <div className="dim">
        <div className="cont">{children}</div>
      </div>
    </DialogTempleteStyle>
  );
};

const DialogTempleteStyle = styled.div`
  .dim {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    &.non-modal {
      background-color: transparent;
    }

    .cont {
      background-color: #fff;
    }
  }
`;

export default DialogTemplete;
