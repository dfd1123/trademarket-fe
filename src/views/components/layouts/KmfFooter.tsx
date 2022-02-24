import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicButton from '@/views/components/common/Button';

const KmfFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <FooterStyle>
      <BasicButton onClick={() => navigate('/notice')}>
        <div className={`${pathname.includes('/notice') ? 'active':''}`}>
          <i className="cnt">10</i>
          <svg width="23" height="22" viewBox="0 0 23 22" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.7008 3.57731C15.1258 4.72727 14.7413 6.38591 14.7413 8.27259C14.7413 10.1593 15.1258 11.8179 15.7008 12.9679C16.3057 14.1777 16.9563 14.5452 17.3776 14.5452C17.7989 14.5452 18.4496 14.1777 19.0545 12.9679C19.6294 11.8179 20.0139 10.1593 20.0139 8.27259C20.0139 6.38591 19.6294 4.72727 19.0545 3.57731C18.4496 2.36753 17.7989 2 17.3776 2C16.9563 2 16.3057 2.36753 15.7008 3.57731ZM3.13619 6.49812L13.7049 3.12846C13.0915 4.55067 12.7413 6.3496 12.7413 8.27259C12.7413 10.1956 13.0915 11.9945 13.7049 13.4167L3.13619 10.0471L3.11764 10.0414C2.76766 9.93721 2.46516 9.71386 2.26261 9.41003C2.06006 9.10621 1.97024 8.74108 2.00871 8.37796C2.01613 8.30791 2.01613 8.23728 2.00871 8.16723C1.97024 7.80411 2.06006 7.43898 2.26261 7.13516C2.46516 6.83133 2.76766 6.60798 3.11764 6.50384L3.13619 6.49812ZM2.53715 4.58992L16.3612 0.182355C16.6781 0.0650812 17.017 0 17.3776 0C18.9646 0 20.1321 1.26049 20.8433 2.68288C21.5844 4.16508 22.0139 6.14274 22.0139 8.27259C22.0139 10.4024 21.5844 12.3801 20.8433 13.8623C20.1321 15.2847 18.9646 16.5452 17.3776 16.5452C17.017 16.5452 16.6781 16.4801 16.3612 16.3628L10.9439 14.6356L11.8266 17.3031C12.0919 17.9878 12.0795 18.7496 11.7913 19.4259C11.4985 20.1128 10.9452 20.6555 10.2526 20.9348L10.2512 20.9354C9.55826 21.2136 8.78323 21.2054 8.09629 20.9127C7.40936 20.6199 6.86667 20.0666 6.5874 19.374C6.58238 19.3616 6.57761 19.349 6.57309 19.3364L4.11686 12.4589L2.53715 11.9553C1.74376 11.7166 1.0582 11.209 0.59851 10.5194C0.156468 9.85637 -0.0500074 9.06518 0.010257 8.27259C-0.0500074 7.48 0.156468 6.68882 0.59851 6.02576C1.0582 5.33622 1.74376 4.82856 2.53715 4.58992ZM8.5888 13.8847L6.51349 13.2231L8.44846 18.641C8.53122 18.8351 8.68589 18.9899 8.88037 19.0728C9.07963 19.1577 9.30441 19.1601 9.50545 19.0796C9.70615 18.9984 9.86651 18.841 9.95139 18.6418C10.0364 18.4424 10.0388 18.2173 9.95798 18.0161C9.95025 17.9969 9.94313 17.9774 9.93661 17.9577L8.5888 13.8847ZM17.9336 6.46342C18.3793 6.96077 18.6263 7.60478 18.6275 8.27261C18.6263 8.94044 18.3793 9.58445 17.9336 10.0818C17.4879 10.5791 16.8747 10.895 16.211 10.9692C16.0005 10.0859 15.8961 9.18063 15.9001 8.27261C15.8961 7.36459 16.0005 6.45933 16.211 5.57605C16.8747 5.6502 17.4879 5.96608 17.9336 6.46342Z"
              fill="#828282"
            />
          </svg>
          <span>공지사항</span>
        </div>
      </BasicButton>
      <BasicButton onClick={() => navigate('/info')}>
        <div className={`${pathname.includes('/info') ? 'active':''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 5C4.44772 5 4 5.44772 4 6V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V6C20 5.44772 19.5523 5 19 5H5ZM2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V6Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16 1C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V2C15 1.44772 15.4477 1 16 1Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8 1C8.55228 1 9 1.44772 9 2V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V2C7 1.44772 7.44772 1 8 1Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2 10C2 9.44771 2.44772 9 3 9H21C21.5523 9 22 9.44771 22 10C22 10.5523 21.5523 11 21 11H3C2.44772 11 2 10.5523 2 10Z"/>
          </svg>
          <span>사업안내</span>
        </div>
      </BasicButton>
      <BasicButton onClick={() => navigate('/search/user')}>
        <div className={`${pathname.includes('/search/user') ? 'active':''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0977 20.6834 22.0977 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z" />
          </svg>
          <span>회원검색</span>
        </div>
      </BasicButton>
      <BasicButton onClick={() => navigate('/ref')}>
        <div className={`${pathname.includes('/ref') ? 'active':''}`}>
          <i className="cnt">1</i>
          <svg width="24" height="20" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3.55228 5 4 5.44772 4 6V18H20V6C20 5.44772 20.4477 5 21 5C21.5523 5 22 5.44772 22 6V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V6C2 5.44772 2.44772 5 3 5Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V6C24 6.55228 23.5523 7 23 7H1C0.447715 7 0 6.55228 0 6V1ZM2 2V5H22V2H2Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10Z" />
          </svg>
          <span>자료실</span>
        </div>
      </BasicButton>
      <BasicButton onClick={() => navigate('/mypage')}>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z" />
          </svg>
          <span>마이페이지</span>
        </div>
      </BasicButton>
    </FooterStyle>
  );
};

export default KmfFooter;

const FooterStyle = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  margin-top: auto;
  width: 100%;
  min-height: 60px;
  border-top: 1px solid #cacaca;
  display: flex;
  justify-content: space-evenly;
  font-size: 10px;
  background-color: #f0f0f0;
  & > :not(:last-child) {
    border-right: 1px solid #cecece;
  }

  ${BasicButton} {
    width:100%;
    border: none;
    > button {
      text-align: center;

      >div{
        position: relative;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-around;
        .cnt{
          position:absolute;
          top:-8px;
          right:-8px;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width:18px;
          height:18px;
          font-size: 9px;
          color:#fff;
          border-radius:50%;
          background-color: red;
        }

        &.active{
          svg{
            path{ fill:#1574BD; }
          }
          span{ color:#1574BD; }
        }
      }


      svg {
        display: inline-block;
        height: 24px;
        /* width: 22px; */
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;
        > path {
          fill: #828282;
        }
      }
      span {
        display: block;
        margin-top:5px;
        font-size: 10px;
        color: #828282;
        font-weight: 500;
      }
    }
    
    &:nth-child(1) {
      >button >svg { 
        margin-bottom: 0px;
      }    
    }
  }
`;
