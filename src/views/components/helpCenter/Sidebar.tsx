import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarStyle>
      <h3 className="helpCenterNav-title">Help Center</h3>
      <ul className="helpCenterNav-listWrapper">
        <li>
          <Link to="/deposit" className="deposit">
            Deposit
          </Link>
        </li>
        <li>
          <Link to="/withdraw" className="withdraw">
            Withdraw
          </Link>
        </li>
        <li>
          <Link to="/submit-request" className="submit-request">
            Submit Request
          </Link>
        </li>
        <li>
          <Link to="/user-guide" className="user-guide">
            User Guides
          </Link>
        </li>
      </ul>
    </SidebarStyle>
  );
};

export default Sidebar;

const SidebarStyle = styled.aside`
  width: 160px;
  height: 240px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  .helpCenterNav-title {
    font-size: 18px;
    font-weight: 600;
  }

  .helpCenterNav-listWrapper {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 24px;

    & > li {
      color: #a3a3a3;

      &:active {
        color: #f39202;
        background-color: #fdecd4;
      }

      &:hover {
        color: #838383;
      }
    }
  }
`;
