import styled from 'styled-components';
import icoAlertSuccess from '@/assets/img/kmf/ico/ico-alert-success.svg';
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
        padding-left: 56px;
        padding-right: 16px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        line-height: 56px;
        letter-spacing: -1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: #1574bd;
        background-image: url(${icoAlertSuccess});
        background-repeat: no-repeat;
        background-position: 17px center;
      }

      .body {
        padding: 0 16px;
        background-color: #fff;
        .msg {
          padding: 32px 0;
          font-size: 14px;
          color: #353535;
          line-height: 20px;
        }
      }
      .btn-holder {
          padding: 8px 16px;
          text-align: right;
          background-color: #fff;

          ${BasicButton} {
            min-width: 76px;
            min-height: 32px;
            font-size: 14px;
            color: #1574bd;
            border: none;
            border-radius: 3px;
            background-color: #fff;

            &:nth-child(2) {
              color: #fff;
              background-color: #1574bd;
            }
          }
        }
    }
  }
`;

export default DialogTemplete;
