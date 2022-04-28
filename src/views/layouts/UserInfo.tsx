import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { AuthState } from '@/store/auth/types/auth';
import styled from 'styled-components';
import LogoutTimer from '@/views/layouts/LogoutTimer';
import BasicButton from '../components/common/Button';
import useService from '@/hooks/useService';
import { useNavigate } from 'react-router';

interface PropsType {
  info: AuthState;
}

const UserInfo = ({ info }: PropsType) => {
    const services = useService();
    const navigate = useNavigate();

    const logout = () => {
        services.user.logout();
        navigate('/login');
    }
  return (
    <UserInfoStyle>
      <LogoutTimer />
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.5385"
          cy="12.5385"
          r="11.5385"
          fill="white"
          fillOpacity="0.25"
        ></circle>
        <path
          d="M13 1C6.38333 1 1 6.38333 1 13C1 19.6167 6.38333 25 13 25C19.6167 25 25 19.6167 25 13C25 6.38333 19.6167 1 13 1ZM13 23.9565C6.95825 23.9565 2.04346 19.0417 2.04346 13C2.04346 6.95825 6.95825 2.04346 13 2.04346C19.0417 2.04346 23.9565 6.95825 23.9565 13C23.9565 19.0417 19.0417 23.9565 13 23.9565Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="0.4"
        ></path>
        <path
          d="M12.9994 12.4783C9.25958 12.4783 6.2168 15.5211 6.2168 19.261C6.2168 19.549 6.45055 19.7827 6.73855 19.7827C7.02655 19.7827 7.26031 19.5489 7.26031 19.2609C7.26031 16.096 9.83456 13.5218 12.9994 13.5218C16.1643 13.5218 18.7385 16.096 18.7385 19.2609C18.7385 19.5489 18.9723 19.7827 19.2603 19.7827C19.5483 19.7827 19.7821 19.5489 19.7821 19.2609C19.7821 15.5211 16.7393 12.4783 12.9994 12.4783Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="0.4"
        ></path>
        <path
          d="M12.9998 4.13045C10.9859 4.13045 9.34766 5.76869 9.34766 7.78264C9.34766 9.79659 10.9859 11.4348 12.9998 11.4348C15.0138 11.4348 16.652 9.79654 16.652 7.78264C16.652 5.76874 15.0138 4.13045 12.9998 4.13045ZM12.9998 10.3913C11.5619 10.3913 10.3912 9.22054 10.3912 7.78264C10.3912 6.34474 11.5619 5.17396 12.9998 5.17396C14.4377 5.17396 15.6085 6.34474 15.6085 7.78264C15.6085 9.22054 14.4378 10.3913 12.9998 10.3913Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="0.4"
        ></path>
      </svg>
      <span className="name">{info.data.email}</span>
      <BasicButton onClick={logout}>Logout</BasicButton>
    </UserInfoStyle>
  );
};

const UserInfoStyle = styled.div`
  > svg,
  > span {
    display: inline-block;
    vertical-align: middle;
    color: ${(props) => props.theme.header.color};
    path{
      fill: ${(props) => props.theme.header.color};
    }
  }
  .name {
    margin-left: 5px;
    font-size: 16px;
    color: ${(props) => props.theme.header.color};
  }

  ${BasicButton} {
    display: inline-block !important;
    vertical-align: middle;
    width: 90px;
    height: 32px;
    margin-left: 10px;
    font-size: 17px;
    font-weight: 700;
    color: ${(props) => props.theme.name !== 'light' ? 'rgba(255, 255, 255, 0.62)':'rgba(0, 0, 0, 0.87)'};
    border:1px solid ${(props) => props.theme.name !== 'light' ? 'rgba(255, 255, 255, 0.62)':'rgba(0, 0, 0, 0.87)'};
  }

  @media (max-width: ${TABLET_SIZE}) {
    display: none;
  }
`;

export default UserInfo;
