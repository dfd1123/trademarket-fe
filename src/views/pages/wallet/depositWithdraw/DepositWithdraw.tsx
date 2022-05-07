import React, { useState } from "react";
import styled from "styled-components";
import Tab from "@/views/components/common/tab/Tab";
import { LightSelectBox } from "@/views/components/common/input/SelectBox";
import TextInput from "@/views/components/common/input/TextInput";
import DepositRequest from "@/views/components/wallet/depositWithdraw/DepositRequest";
import DepositTable from "@/views/components/wallet/depositWithdraw/DepositTable";

const DepositWithdraw = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <DepositWithdrawStyle>
      <h4 className="sub-tit">Deposit / Withdraw</h4>
      <Tab
        list={["Deposit", "Withdraw"]}
        ripple={false}
        onChange={setTabIndex}
      />
      {tabIndex === 0 ? (
        <>
          <DepositRequest />
          <DepositTable />
        </>
      ) : (
        <></>
      )}
    </DepositWithdrawStyle>
  );
};

const DepositWithdrawStyle = styled.div`
  .inp-cont {
    > .label {
      display: block;
      margin-top: 10px;
      margin-bottom: 4px;
      font-size: 15px;
      font-weight: bold;
      line-height: 20px;
    }

    ${LightSelectBox} {
      width: 100%;
      font-size: 15px;
      border: 1px solid #ddd;
    }

    ${TextInput} {
      height: 48px;
      input {
        padding: 0 16px;
        color: #383838;
        border: 1px solid rgb(221, 221, 221);

        &:focus {
          border: 2px solid #000;
        }

        &:disabled {
          background-color: #f0f0f0;
        }
      }
    }
  }
`;

export default DepositWithdraw;
