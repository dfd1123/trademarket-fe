import { DialogComponentPropsType } from '@/store/modal/types/dialog';
import styled from 'styled-components';
import BasicButton from '@/views/components/common/Button';
import DialogTemplete from '@/views/components/common/dialog/DialogTemplete';
import Component from '@/views/components/common/Component';

const Confirm = ({
  title,
  msg,
  children,
  button,
  resolve,
}: DialogComponentPropsType) => {
  const handleButtonClick = (value: boolean) => {
    if (resolve) resolve(value);
  };

  return (
    <DialogTemplete>
      {title ? <strong className="title">{title}</strong> : ''}
      <div className="body">
        <p className="msg">{msg}</p>
        {children}
      </div>
      <Component is={children} />
      <div className="btn-holder">
        <BasicButton
          className="btn-no"
          onClick={() => handleButtonClick(false)}>
          {button.no}
        </BasicButton>
        <BasicButton
          className="btn-yes"
          onClick={() => handleButtonClick(true)}>
          {button.yes}
        </BasicButton>
      </div>
    </DialogTemplete>
  );
};

const AlertStyle = styled.div``;

export default Confirm;
