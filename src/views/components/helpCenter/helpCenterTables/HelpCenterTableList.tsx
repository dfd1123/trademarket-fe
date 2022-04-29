import React, { useState } from "react";
import styled from "styled-components";
import {
  DepositRequestData,
  DepositRequestHistoryOutput,
  SubmitRequestData,
  SubmitRequestListDataOutput,
  WithdrawRequestData,
  WithdrawRequestHistoryOutput,
} from "@/services/types/HelpCenter";
import { useNavigate } from "react-router-dom";

interface PropsType {
  className: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info:
    | DepositRequestHistoryOutput
    | WithdrawRequestHistoryOutput
    | SubmitRequestListDataOutput;
  onClick?: (id: string) => void;
}

const HelpCenterTableList = ({
  className,
  tableHdInfo,
  info,
  onClick,
}: PropsType) => {
  const row = Object.values(info).map((item, index) => {
    return (
      <span
        key={index}
        className={className}
        style={{
          width: `${tableHdInfo[index].ratio * 100}%`,
          color: "black",
          textAlign: `${onClick && index === 2 ? "start" : "center"}`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item}
      </span>
    );
  });

  return (
    <HelpCenterTableListStyle>
      {onClick ? (
        <div style={{ width: "100%" }} onClick={() => onClick(info.no)}>
          {row}
        </div>
      ) : (
        row
      )}
    </HelpCenterTableListStyle>
  );
};

export default HelpCenterTableList;

const HelpCenterTableListStyle = styled.div`
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  table-layout: fixed;
`;
