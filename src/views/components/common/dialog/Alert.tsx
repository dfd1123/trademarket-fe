import { DialogComponentPropsType } from "@/store/modal/types/dialog";
import styled from "styled-components";
import BasicButton from "@/views/components/common/Button";
import DialogTemplete from "@/views/components/common/dialog/DialogTemplete";

const Alert = ({
  title,
  msg,
  button,
  close,
  resolve,
}: DialogComponentPropsType) => {
  const handleButtonClick = () => {
    if (resolve) resolve(true);
  };

  return (
    <DialogTemplete>
      {title ? <strong className="title">{title}</strong> : ""}
      <p>{msg}</p>
      <div className="btn-holder">
        <BasicButton className="btn-yes" onClick={handleButtonClick}>
          {button.yes}
        </BasicButton>
      </div>
    </DialogTemplete>
  );
};

const AlertStyle = styled.div``;

export default Alert;
