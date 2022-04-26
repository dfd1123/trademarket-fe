import React from "react";
import styled from "styled-components";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";
import { useParams } from "react-router-dom";

const dummyData = [
  {
    no: 1,
    stat: "333rasdf",
    subject: "fsgasflgjsdlkgjalsdgjlaksgjlasgjljsgaj",
    content:
      "Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.",
    entryTime: "2020-02-02",
    answerTime: "2020-02-02",
    answerSubject: "Velox gluten saepe resuscitabos bubo est.",
    answerContent:
      "Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est. Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.Velox gluten saepe resuscitabos bubo est.",
  },
  {
    no: 2,
    stat: "333rasdf",
    subject:
      "as ldfjhaidslfj werijrsafg zxvnlkzxv ewtj opeoppopi pilmnnu as ldfjhaidslfj werijrsafg zxvnlkzxv ewtj opeoppopi pilmnnu as ldfjhaidslfj werijrsafg zxvnlkzxv ewtj opeoppopi pilmnnu",
    content: "asdfasdf",
    entryTime: "2020-02-02",
    answerTime: "2020-02-02",
    answerSubject: "",
    answerContent: "",
  },
];

const SubmitRequestDetail = () => {
  const { id } = useParams();
  const { subject, content, answerContent, answerSubject } =
    dummyData[(id ? Number(id) : 1) - 1];

  return (
    <HelpCenterLayout title="Submit Request">
      <ContainerStyle>
        <div className="request-detail-subject detail-subject">{subject}</div>
        <div className="request-detail-content detail-content">{content}</div>
        <div className="request-detail-answer-subject detail-subject">
          {answerSubject}
        </div>
        <div className="request-detail-answer-content detail-content">
          {answerContent}
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
