import React, { useEffect } from "react";
import styled from "styled-components";
import HelpCenterLayout from "@/views/components/helpCenter/HelpCenterLayout";
import HelpCenterTableList from "@/views/components/helpCenter/helpCenterTables/HelpCenterTableList";
import HelpCenterTableHd from "@/views/components/helpCenter/helpCenterTables/HelpCenterTableHd";
import HelpCenterTableBd from "@/views/components/helpCenter/helpCenterTables/HelpCenterTableBd";
import { BasicButton } from "@/views/components/common/Button";
import { MOBILE_SIZE } from "@/assets/styles/responsiveBreakPoint";
import IntegerInput from "@/views/components/common/input/IntegerInput";
import { useNavigate, Link } from "react-router-dom";
import useService from "@/hooks/useService";
import useUserData from "@/hooks/useUserData";

const tableHdLabel = [
  { label: "No", ratio: 0.1 },
  { label: "Stat", ratio: 0.1 },
  { label: "Request Subject", ratio: 0.5 },
  { label: "Entry Time", ratio: 0.15 },
  { label: "Answer Time", ratio: 0.15 },
];

const SubmitRequest = () => {
  const navigate = useNavigate();
  const service = useService();
  const { submitRequestList, getSubmitRequestList, getSubmitRequestDetail } =
    service.helpCenter.getSubmitRequestData();

  useEffect(() => {
    getSubmitRequestList();
  }, []);

  const onClick = (id: string) => {
    navigate(`/submit-request/${id}`);
  };

  return (
    <HelpCenterLayout title="Withdraw">
      <ContainerStyle>
        <div className="input-wrapper">
          <BasicButton
            onClick={() => navigate("/submit-request/write")}
            className="submit-request-btn"
          >
            Request
          </BasicButton>
        </div>
        <div className="submit-request-table-container">
          <div className="submit-request-table-wrapper">
            <HelpCenterTableHd
              className="submit-request-request-tableHd"
              list={tableHdLabel}
            />
            <HelpCenterTableBd>
              {submitRequestList ? (
                submitRequestList.map((item, index) => {
                  return (
                    <HelpCenterTableList
                      key={index}
                      className="submit-request-table-subject"
                      tableHdInfo={tableHdLabel}
                      info={item}
                      onClick={onClick}
                    />
                  );
                })
              ) : (
                <div>no data</div>
              )}
            </HelpCenterTableBd>
          </div>
        </div>
      </ContainerStyle>
    </HelpCenterLayout>
  );
};

export default SubmitRequest;

const ContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .submit-request-request-tableHd {
    background-color: white;

    span {
      color: black;
      border-top: 1px solid black;
    }
  }

  .submit-request-client-no {
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px 8px;
    width: 240px;
    align-self: flex-end;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${MOBILE_SIZE}) {
      width: 100%;
    }
  }

  .input-wrapper {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 36px;

    .submit-request-btn {
      height: 100%;
      border: 1px solid black;
      padding: 0 16px;
      @media (max-width: ${MOBILE_SIZE}) {
        width: 30%;
      }
    }

    ${IntegerInput} {
      width: 240px;
      @media (max-width: ${MOBILE_SIZE}) {
        width: 60%;
      }

      label {
        background-color: transparent;
      }

      .btn-holder {
        display: none;
      }
    }
  }

  .submit-request-table-container {
    overflow-x: auto;

    ::-webkit-scrollbar-thumb {
      background-color: #a8a8a8;
    }

    .submit-request-table-wrapper {
      min-width: 1020px;

      .submit-request-table-subject {
      }
    }
  }
`;
