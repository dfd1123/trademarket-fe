import React from "react";
import styled from "styled-components";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";
import TextInput, {
  BasicInput,
  MerterialInput,
} from "@/views/components/common/input/TextInput";
import BasicButton from "@/views/components/common/Button";
import TextArea from "@/views/components/common/input/TextArea";

const SubmitRequestWrite = () => {
  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("submit");
  };

  return (
    <HelpCenterLayout title="Submit Request">
      <ContainerStyle>
        <form className="submit-form">
          <MerterialInput className="submit-write-title" label="title" />
          <TextArea className="submit-write-content" label="content" />
          <BasicButton className="submit-write-btn" onClick={onSubmit}>
            Submit
          </BasicButton>
        </form>
      </ContainerStyle>
    </HelpCenterLayout>
  );
};

export default SubmitRequestWrite;

const ContainerStyle = styled.div`
  width: 100%;

  .submit-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .submit-write-title {
    width: 100%;
  }

  .submit-write-content {
    textarea {
      min-height: 360px;
    }
  }

  .submit-write-btn {
    width: 160px;
    height: 40px;
    align-self: flex-end;
  }
`;
