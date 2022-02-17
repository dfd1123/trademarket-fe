import styled from 'styled-components';
import BasicButton from '@/views/components/common/Button';

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shared?: boolean;
  className?: string;
  disabled?: boolean;
}

const FooterButton = ({ children, shared, onClick }: PropTypes) => {
  return (
    <FooterButtonStyle>
      {shared ? <BasicButton>공유</BasicButton> : ''}
      <BasicButton during={1000} onClick={onClick}>{children}</BasicButton>
    </FooterButtonStyle>
  );
};

const FooterButtonStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width:100%;

  ${BasicButton} {
    width: 100%;
    border-radius: 0;
    > button {
      width: 100%;
      height: 60px;
      font-size: 17px;
      font-weight:500;
      line-height: 25px;
      color: #fff;
      background-color: #1574bd;
    }
  }
`;

export default FooterButton;
