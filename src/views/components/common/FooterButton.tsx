import styled from 'styled-components';
import BasicButton from '@/views/components/common/Button';
import useToast from '@/hooks/useToast';

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shared?: boolean;
  className?: string;
  disabled?: boolean;
}

const FooterButton = ({ children, shared, disabled = false, onClick }: PropTypes) => {
  const {toast} = useToast();

  const urlCopy = () => {
    let url = '';
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast('현재 url 링크 주소가 복사 되었습니다.', {type: 'success'});
  }

  return (
    <FooterButtonStyle className={`${shared ? 'shared' : ''}`}>
      {shared ? <BasicButton className="btn-shared" onClick={urlCopy}>공유</BasicButton> : ''}
      <BasicButton during={1000} disabled={disabled} onClick={onClick}>{children}</BasicButton>
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
    border:none;
    > button {
      width: 100%;
      height: 60px;
      font-size: 17px;
      font-weight:500;
      line-height: 25px;
      color: #fff;
      background-color: #1574bd;

      &:disabled{
          color:#bbb;
          background-color: #eee;
      }
    }
  }

  &.shared{
    ${BasicButton} {
      float:left;
      &:first-child{
        width:30%;
        >button{
          background-color: #A7CD10;
        }
      }
      &:last-child{
        width:70%;
      }
    }
  }
`;

export default FooterButton;
