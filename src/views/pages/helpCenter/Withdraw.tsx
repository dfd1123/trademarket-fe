import React from "react";
import styled from "styled-components";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";
import IntegerInput from "@/views/components/common/input/IntegerInput";
import { BasicInput } from "@/views/components/common/input/TextInput";
import TableHd from "@/views/components/trade/tradeTables/TableHd";
import TableBd from "@/views/components/trade/tradeTables/TableBd";
import HelpCenterTableList from "@/views/components/helpCenter/HelpCenterTableList";
import { MOBILE_SIZE } from "@/assets/styles/responsiveBreakPoint";
import BasicButton from "@/views/components/common/Button";

const date = new Date().toDateString();

const tableHdLabel = [
  { label: "No", ratio: 0.1 },
  { label: "Account No", ratio: 0.2 },
  { label: "DateTime", ratio: 0.2 },
  { label: "Amount", ratio: 0.2 },
  { label: "Stat", ratio: 0.1 },
  { label: "Etc Information", ratio: 0.2 },
];

const dummyData = [
  {
    no: 1,
    accountNo: "333rasdf",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
  {
    no: 2,
    accountNo: "wqt",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
  {
    no: 3,
    accountNo: "dfggabv",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
  {
    no: 4,
    accountNo: "fgdfg",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
  {
    no: 5,
    accountNo: "xcbear",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
  {
    no: 6,
    accountNo: "adrfgarwg",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
  {
    no: 7,
    accountNo: "333rabxbxsdf",
    dateTime: date,
    amount: 45,
    state: "cancel",
    etcInfo: "dddd",
  },
];

const Widthraw = () => {
  return (
    <HelpCenterLayout title="withdraw">
      <ContainerStyle>
        <div className="withdraw-client-no">Client No: 2311233-423-2</div>
        <div className="input-wrapper">
          <IntegerInput placeholder="Amount" />
          <BasicInput
            className="withdraw-etc-info"
            placeholder="Etc Information"
          />
          <BasicButton className="withdraw-submit-btn">SUBMIT</BasicButton>
        </div>
        <div className="withdraw-table-container">
          <div className="withdraw-table-wrapper">
            <TableHd className="withdraw-request-tableHd" list={tableHdLabel} />
            <TableBd>
              {dummyData ? (
                dummyData.map((item, index) => {
                  return (
                    <HelpCenterTableList
                      key={index}
                      className="withdraw-request-row"
                      tableHdInfo={tableHdLabel}
                      info={item}
                    />
                  );
                })
              ) : (
                <div>no data</div>
              )}
            </TableBd>
          </div>
        </div>
      </ContainerStyle>
    </HelpCenterLayout>
  );
};

export default Widthraw;

const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  //overflow-x: auto;

  .withdraw-request-tableHd {
    background-color: white;

    span {
      color: black;
      border-top: 1px solid black;
    }
  }

  .withdraw-client-no {
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
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 12px;
    height: 36px;
    @media (max-width: ${MOBILE_SIZE}) {
      justify-content: space-between;
      height: auto;
    }

    .withdraw-submit-btn {
      height: 100%;
      border: 1px solid black;
      padding: 10px 16px;
      margin-left: auto;
      @media (max-width: ${MOBILE_SIZE}) {
        margin-left: 0;
        width: 100%;
      }
    }

    ${IntegerInput} {
      width: 220px;
      @media (max-width: ${MOBILE_SIZE}) {
        width: 45%;
      }

      label {
        background-color: transparent;
      }

      .btn-holder {
        display: none;
      }
    }

    .withdraw-etc-info {
      background-color: white;
      border-radius: 4px;
      width: 220px;
      @media (max-width: ${MOBILE_SIZE}) {
        width: 45%;
      }

      > div {
        width: 100%;
      }

      input {
        width: 100%;
        border: 1px solid black;
        background-color: white;
      }
    }
  }

  .withdraw-table-container {
    overflow-x: auto;

    ::-webkit-scrollbar-thumb {
      background-color: #a8a8a8;
    }

    .withdraw-table-wrapper {
      min-width: 1020px;
    }
  }
`;
