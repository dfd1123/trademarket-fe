import React, { useEffect } from "react";
import styled from "styled-components";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";
import HelpCenterTableList from "@/views/components/helpCenter/helpCenterTables/HelpCenterTableList";
import IntegerInput from "@/views/components/common/input/IntegerInput";
import { BasicButton } from "@/views/components/common/Button";
import { MOBILE_SIZE } from "@/assets/styles/responsiveBreakPoint";
import HelpCenterTableHd from "@/views/components/helpCenter/helpCenterTables/HelpCenterTableHd";
import HelpCenterTableBd from "@/views/components/helpCenter/helpCenterTables/HelpCenterTableBd";
import useService from "@/hooks/useService";
import useUserData from "@/hooks/useUserData";

const date = new Date().toDateString();

const tableHdLabel = [
  { label: "No", ratio: 0.1 },
  { label: "Account No", ratio: 0.2 },
  { label: "DateTime", ratio: 0.2 },
  { label: "Amount", ratio: 0.2 },
  { label: "Stat", ratio: 0.1 },
  { label: "Client No", ratio: 0.2 },
];

const dummyData = [
  {
    no: 1,
    accountNo: "333rasdf",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
  {
    no: 2,
    accountNo: "wqt",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
  {
    no: 3,
    accountNo: "dfggabv",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
  {
    no: 4,
    accountNo: "fgdfg",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
  {
    no: 5,
    accountNo: "xcbear",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
  {
    no: 6,
    accountNo: "adrfgarwg",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
  {
    no: 7,
    accountNo: "333rabxbxsdf",
    dateTime: date,
    amount: 45,
    state: "cancel",
    clientNo: "dddd",
  },
];

const Deposit = () => {
  const service = useService();
  const { deposit, getDepositHistory } = service.helpCenter.getDepositHistory();

  useEffect(() => {
    getDepositHistory();
  }, []);

  return (
    <HelpCenterLayout title="Deposit">
      <ContainerStyle>
        <div className="deposit-client-no">Client No: 2311233-423-2</div>
        <div className="input-wrapper">
          <IntegerInput placeholder="Amount" />
          <BasicButton className="deposit-submit-btn">SUBMIT</BasicButton>
        </div>
        <div className="deposit-table-container">
          <div className="deposit-table-wrapper">
            <HelpCenterTableHd
              className="deposit-request-tableHd"
              list={tableHdLabel}
            />
            <HelpCenterTableBd>
              {deposit ? (
                deposit.map((item, index) => {
                  return (
                    <HelpCenterTableList
                      key={index}
                      className="deposit-request-row"
                      tableHdInfo={tableHdLabel}
                      info={item}
                    />
                  );
                })
              ) : (
                <div>no data</div>
              )}
            </HelpCenterTableBd>
          </div>
        </div>
      </ContainerStyle>
    </HelpCenterLayout>
  );
};

export default Deposit;

const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .deposit-request-tableHd {
    background-color: white;

    span {
      color: black;
      border-top: 1px solid black;
    }
  }

  .deposit-client-no {
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px 8px;
    width: 240px;
    align-self: flex-end;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${MOBILE_SIZE}) {
      width: 100%;
    }
  }

  .input-wrapper {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;

    .deposit-submit-btn {
      height: 100%;
      border: 1px solid black;
      padding: 0 16px;
      @media (max-width: ${MOBILE_SIZE}) {
        width: 30%;
      }
    }

    ${IntegerInput} {
      width: 240px;
      @media (max-width: ${MOBILE_SIZE}) {
        width: 60%;
      }

      label {
        background-color: transparent;
      }

      .btn-holder {
        display: none;
      }
    }
  }

  .deposit-table-container {
    overflow-x: auto;

    ::-webkit-scrollbar-thumb {
      background-color: #a8a8a8;
    }

    .deposit-table-wrapper {
      min-width: 1020px;
    }
  }
`;
