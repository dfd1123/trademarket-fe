import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";
import { useParams } from "react-router-dom";
import useService from "@/hooks/useService";
import { SubmitRequestDetailOutput } from "@/services/types/HelpCenter";

const SubmitRequestDetail = () => {
  const { id } = useParams();
  const service = useService();
  const { submitRequestDetail, getSubmitRequestDetail } =
    service.helpCenter.getSubmitRequestData();

  useEffect(() => {
    getSubmitRequestDetail(id ? id : "");
  }, []);

  const breakLine = (line: string | undefined) =>
    line
      ? line
          .trim()
          .split("#")
          .map((item) => (
            <span>
              {item}
              <br />
            </span>
          ))
      : null;

  return (
    <HelpCenterLayout title="Submit Request">
      <ContainerStyle>
        <div className="request-detail-subject detail-subject">
          {submitRequestDetail.title}
        </div>
        <div className="request-detail-content detail-content">
          {breakLine(submitRequestDetail.content)}
        </div>
        <div className="request-detail-answer-subject detail-subject">
          {submitRequestDetail.answerTitle}
        </div>
        <div className="request-detail-answer-content detail-content">
          {breakLine(submitRequestDetail.answerContent)}
        </div>
      </ContainerStyle>
    </HelpCenterLayout>
  );
};

export default SubmitRequestDetail;

const ContainerStyle = styled.div`
  width: 100%;

  > div {
    margin-bottom: 24px;
    max-width: 860px;
  }

  .detail-subject {
    font-size: 20px;
  }

  .detail-content {
    font-size: 14px;
    line-height: 18px;
    padding: 12px;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
    min-height: 360px;
  }

  .request-detail-subject {
    margin-top: 24px;
  }

  .request-detail-content {
    margin-bottom: 64px;
  }
`;
