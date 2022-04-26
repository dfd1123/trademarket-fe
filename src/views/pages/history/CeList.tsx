import React from "react";
import styled from "styled-components";
import HistoryHero from "@/views/components/history/HistoryHero";

const CeList = () => {
  return (
    <ContainerStyle>
      <HistoryHero title="Close Execution List" />
    </ContainerStyle>
  );
};

export default CeList;

const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
