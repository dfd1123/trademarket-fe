import React from "react";
import styled from "styled-components";
import HistoryHero from "@/views/components/history/HistoryHero";

const OeDetail = () => {
  return (
    <ContainerStyle>
      <HistoryHero title="Order / Execution Detail" />
    </ContainerStyle>
  );
};

export default OeDetail;

const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
