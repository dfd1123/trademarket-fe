import React, { useState } from "react";
import styled from "styled-components";
import {
  DepositRequestData,
  SubmitRequestData,
  WithdrawRequestData,
} from "@/services/types/HelpCenter";
import { useNavigate } from "react-router-dom";

interface PropsType {
  className: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info: DepositRequestData | WithdrawRequestData | SubmitRequestData;
  linkTo?: string;
}

const HelpCenterTableList = ({
  className,
  tableHdInfo,
  info,
  linkTo,
}: PropsType) => {
  const navigate = useNavigate();

  const row = Object.values(info).map((item, index) => {
    return (
      <span
        key={index}
        className={className}
        style={{
          width: `${tableHdInfo[index].ratio * 100}%`,
          color: "black",
          textAlign: `${linkTo && index === 2 ? "start" : "center"}`,
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
      {linkTo ? (
        <div style={{ width: "100%" }} onClick={() => navigate(linkTo)}>
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
