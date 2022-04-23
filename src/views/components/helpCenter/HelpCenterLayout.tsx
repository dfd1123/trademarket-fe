import React from "react";
import styled from "styled-components";
import Sidebar from "@/views/components/common/Sidebar";

interface PropsType {
  title: string;
  children: React.ReactElement;
}

const HelpCenterLayout = ({ title, children }: PropsType) => {
  return (
    <HelpCenterStyle>
      <Sidebar />
      <section className="content-section">
        <h2>{title}</h2>
        {children}
      </section>
    </HelpCenterStyle>
  );
};

export default HelpCenterLayout;

const HelpCenterStyle = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 20px 48px 20px;
  display: flex;

  & h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .content-section {
    width: 100%;
    height: 100%;
    padding: 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
`;
