import React from 'react';
import styled from 'styled-components';

const Sidebar = () => {
  return (
    <SidebarStyle>
      <h3 className='helpCenterNav-title'>Help Center</h3>
      <ul className="helpCenterNav-listWrapper">
        <li>
          <a>Deposit</a>
        </li>
        <li>
          <a>Withdraw</a>
        </li>
        <li>
          <a>Submit Request</a>
        </li>
        <li>
          <a>User Guides</a>
        </li>
      </ul>
    </SidebarStyle>
  )
}

export default Sidebar;

const SidebarStyle = styled.aside`
  width: 160px;
  height: 240px;

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

      &:hover {
        color: #838383;
      }
    }
  }
`;