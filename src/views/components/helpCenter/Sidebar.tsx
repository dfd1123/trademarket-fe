import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // pathname에 의존성이 있어서 좋은 방법인지는 잘...
  useEffect(() => {
    const query = `.hs-${location.pathname.replace("/", "")}`;
    const menu = document.querySelector(query);
    menu?.classList.add("menu-active");
    console.log("render");
  }, []);

  return (
    <SidebarStyle>
      <h3 className="helpCenterNav-title">Help Center</h3>
      <ul className="helpCenterNav-listWrapper">
        <li className="help-center-menu hs-deposit">
          <Link to="/deposit" className="deposit">
            Deposit
          </Link>
        </li>
        <li className="help-center-menu hs-withdraw">
          <Link to="/withdraw" className="withdraw">
            Withdraw
          </Link>
        </li>
        <li className="help-center-menu hs-submit-request">
          <Link to="/submit-request" className="submit-request">
            Submit Request
          </Link>
        </li>
        <li className="help-center-menu hs-user-guide">
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
    gap: 14px;
    margin-top: 24px;

    .help-center-menu {
      color: #a3a3a3;
      padding: 6px;
      border-radius: 3px;
    }

    .menu-active {
      color: #f39202 !important;
      background-color: #fdecd4;
    }
  }
`;

/**
 * --------------------------------------------------------------------------
 * deposit, withdraw 페이지 공통
 * - t113C에서 szBankAccNo 가져와야함
 *   t113C 로그인할때 사용됨
 *
 * deposit
 * - t2313에서 deposit list
 *
 * withdraw
 * - t2413에서 withdraw list
 *
 * --------------------------------------------------------------------------
 *
 * submit request
 * - t2511에서 게시글 리스트
 *     const faqListInfo = {
 *       Header: {
 *       	function: 'D', termtype: 'HTS', trcode: 't2511'
 *   	},
 *       	Input1: { szCust_No: email, szFrom_Date: '20220109000000', szTo_Date: now },
 *     };
 *
 * submit request detail page
 * - t2713 게시글 디테일
 *     const info = {
 *       Header: {
 *         function: 'D',
 *         termtype: 'HTS',
 *         trcode: 't2713',
 *       },
 *       Input1: {
 *         szCust_No: name,
 *         szReq_Seq_No: id,
 *         szPrc_Seq_No: '1',
 *       },
 *     };
 *
 * submit request request
 * - t2510 게시글 요청
 * {
 *     Header: { function: 'D', termtype: 'HTS', trcode: 't2510' },
 *     Input1: {
 *       szCust_No: email,
 *       szReq_Seq_No: '0',
 *       szQue_Title_Data: e.target.value,
 *       szQue_Data1: '',
 *       szQue_Data2: '',
 *       szQue_Data3: '',
 *       szQue_Memo: content,
 *     },
 * */
