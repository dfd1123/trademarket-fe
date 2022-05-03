import styled from 'styled-components';
import icoAlertSuccess from '@/assets/img/icon/ico-alert-success.svg';
import BasicButton from '../Button';

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
      width: 300px;
      border-radius: 5px;
      overflow: hidden;

      > strong {
        display: block;
        padding: 18px 20px;
        font-size: 20px;
        font-weight: 700;
        color: #777;
        text-align: center;
        background-color: #fff;
        letter-spacing: -1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .body {
        padding: 0 20px;
        background-color: #fff;
        .msg {
          padding-bottom: 20px;
          font-size: 12px;
          color: #353535;
          text-align: center;
        }
        .inp{
          >div{ 
            width:100%;
            height: 40px;
           }
        }
      }


      .btn-holder {
          padding: 16px 16px 20px;
          text-align: center;
          background-color: #fff;

          ${BasicButton} {
            min-width: 76px;
            min-height: 32px;
            font-size: 14px;
            color: #1574bd;
            border: 1px solid #1574bd;
            border-radius: 3px;
            background-color: #fff;

            &:nth-child(2) {
              color: #fff;
              background-color: #1574bd;
              margin-left: 5px;
            }
          }
        }
    }
  }
`;

export default DialogTemplete;
