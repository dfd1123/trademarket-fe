import React, { useState } from "react";
import styled from "styled-components";
import {
  DepositRequestData,
  WithdrawRequestData,
} from "@/services/types/HelpCenter";

interface PropsType {
  className: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info: DepositRequestData | WithdrawRequestData;
}

const HelpCenterTableList = ({ className, tableHdInfo, info }: PropsType) => {
  // const [tableHd, setTableHd] = useState(tableHdInfo);

  const row = () => {
    const newInfo = { ...info };
  };

  return (
    <HelpCenterTableListStyle>
      {Object.values(info).map((item, index) => {
        return (
          <span
            key={index}
            className={className}
            style={{
              width: `${tableHdInfo[index].ratio * 100}%`,
              color: "black",
            }}
          >
            {item}
          </span>
        );
      })}
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
