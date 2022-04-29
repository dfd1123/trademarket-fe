import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { TABLET_SIZE } from "@/assets/styles/responsiveBreakPoint";

const Sidebar = () => {
  return (
    <SidebarStyle>
      <h3 className="helpCenterNav-title">Help Center</h3>
      <ul className="helpCenterNav-listWrapper">
        <li className="help-center-menu hs-deposit">
          <NavLink to="/deposit" className="help-center-menu-link deposit">
            Deposit
          </NavLink>
        </li>
        <li className="help-center-menu hs-withdraw">
          <NavLink to="/withdraw" className="help-center-menu-link withdraw">
            Withdraw
          </NavLink>
        </li>
        <li className="help-center-menu hs-submit-request">
          <NavLink
            to="/submit-request"
            className="help-center-menu-link submit-request"
          >
            Submit Request
          </NavLink>
        </li>
        <li className="help-center-menu hs-user-guide">
          <NavLink
            to="/user-guide"
            className="help-center-menu-link user-guide"
          >
            User Guides
          </NavLink>
        </li>
      </ul>
    </SidebarStyle>
  );
};

export default Sidebar;

const SidebarStyle = styled.aside`
  width: 160px;
  height: 240px;
  position: absolute;

  @media screen and (max-width: ${TABLET_SIZE}) {
    display: none;
  }

  .helpCenterNav-title {
    font-size: 18px;
    font-weight: 600;
  }

  .helpCenterNav-listWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 24px;

    .help-center-menu {
      color: #a3a3a3;
      padding: 6px;
      border-radius: 3px;
      width: 100%;
      display: flex;

      .help-center-menu-link {
        width: 100%;
        padding: 3px 8px;
        border-radius: 3px;
      }
    }

    .active {
      color: #f39202 !important;
      background-color: #fdecd4;
    }
  }
`;
