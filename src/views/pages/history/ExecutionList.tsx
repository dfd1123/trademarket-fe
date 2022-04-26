import React from "react";
import styled from "styled-components";
import HistoryHero from "@/views/components/history/HistoryHero";

const ExecutionList = () => {
  return (
    <ContainerStyle>
      <HistoryHero title="Execution List"></HistoryHero>
    </ContainerStyle>
  );
};

export default ExecutionList;

const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
