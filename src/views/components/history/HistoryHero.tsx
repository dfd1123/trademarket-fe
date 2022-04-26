import React from "react";
import styled from "styled-components";
import { Container } from "@material-ui/core";

interface PropsType {
  title: string;
}

const HistoryHero = ({ title }: PropsType) => {
  return (
    <ContainerStyle>
      <h2 className="history-hero-title">{title}</h2>
      <div className="history-hero-info">
        <div className="hero-info-content profit-loss">ddd</div>
        <div className="hero-info-content account-no">ddd</div>
        <div className="hero-info-content date-select">ddd</div>
      </div>
    </ContainerStyle>
  );
};

export default HistoryHero;

const ContainerStyle = styled.div`
  width: 100%;
  height: 265px;
  padding: 36px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(5, 21, 37, 1) 0%,
    rgba(13, 48, 80, 1) 100%
  );

  .history-hero-title {
    color: white;
    font-size: 24px;
  }

  .history-hero-info {
    display: flex;
    width: 100%;
    background-color: #425c75;
    padding: 16px;
    margin-top: 36px;
    border-radius: 5px;
    color: white;
  }
`;
