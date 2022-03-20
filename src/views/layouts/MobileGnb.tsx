import styled from 'styled-components';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import { NoBorderButton, YellowButton } from '@/views/components/common/Button';
import { FullScreenModalStyle } from '@/views/components/common/modal/ModalTemplate';
import Gnb from '@/views/layouts/Gnb';

const MobileGnb = ({ close, className }: ModalComponentPropsType) => {
  return (
    <StyledMobileGnb>
      <FullScreenModalStyle close={close} className="mobile-gnb">
        <div className="gnb-cont">
          <div className="gnb-top">
            <button className="close-btn" onClick={close}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11.9298 10.6138L17.6 5L19 6.38607L13.3298 11.9999L19 17.6136L17.6 18.9997L11.9298 13.3859L6.4 18.8607L5 17.4746L10.5298 11.9999L5 6.52508L6.4 5.13901L11.9298 10.6138Z"
                  fill="#C5CDD5"
                ></path>
              </svg>
            </button>
            <Gnb className="mobile-gnb" />
          </div>
          <div className="btn-cont">
            <NoBorderButton className="btn-login">Login</NoBorderButton>
            <YellowButton className="btn-register">Register</YellowButton>
          </div>
        </div>
      </FullScreenModalStyle>
    </StyledMobileGnb>
  );
};

export const StyledMobileGnb = styled.div`
  .mobile-gnb {
    .gnb-cont {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
    }
    .cont {
      padding: 16px;
      background-color: #2f4c68;

      .gnb-top {
        width: 100%;
        .close-btn {
          margin: 12px;
        }
        .mobile-gnb{
            &.gnb-menu {
                > li {
                  position: relative;
                  border-bottom: 1px solid #203c57;
      
                  .react-ripples {
                    display: block;
                    width: 100%;
      
                    > a {
                      display: block;
                      width: 100%;
                      padding: 16px;
                      color: #fff;
                      font-size: 15px;
                      line-height: 17px;
                    }
      
                    .arrow {
                      position: absolute;
                      top: 18px;
                      right: 10px;
                      z-index: 1;
                      width: 13px;
                      transform: rotate(0deg);
                      transition: transform 0.2s;
                    }
                  }
      
                  .drop-menu {
                    overflow: hidden;
                    max-height: 0px;
                    background-color: #33353b;
                    transition: max-height 0.2s;
      
                    ul {
                      padding: 10px 0;
                      margin-left: 15px;
                      li {
                        padding: 8px 16px;
                        font-size: 15px;
                        line-height: 22px;
                        color: #fff;
                      }
                    }
                  }
      
                  &.on {
                    .drop-menu {
                      max-height: 190px;
                    }
                    .arrow {
                      transform: rotate(180deg);
                    }
                  }
                }
              }
        }
      }

      .btn-cont {
        width: 100%;
        .btn {
          display: block !important;
          margin-bottom: 15px;

          > button {
            width: 100%;
            height: 48px;
            font-size: 16px;
            line-height: 20px;
            color: #fff;
            font-weight: 700;
          }
        }
        .btn- {
          &login {
            display: block;
          }
          &register {
            display: block;
          }
        }
      }
    }
  }
`;

export default MobileGnb;
