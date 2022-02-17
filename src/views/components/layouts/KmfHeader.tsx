import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '@/views/components/common/Button';
import icoBackArrow from '@/assets/img/kmf/ico/ico-back-arrow.svg';

interface HeaderProps {
  headerText: string;
  prev?: boolean;
  nextLink?: string;
  nextImgUrl?: string;
}

const KmfHeader = ({
  headerText,
  prev = false,
  nextLink,
  nextImgUrl,
}: HeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      {prev && (
        <div className="btn-holder left">
          <BasicButton onClick={goBack}>
            <img src={icoBackArrow} />
          </BasicButton>
        </div>
      )}
      <h1 className="title">{headerText}</h1>
      {nextLink && nextImgUrl && (
        <div className="btn-holder right">
          <BasicButton>
            <img src={nextImgUrl} />
          </BasicButton>
        </div>
      )}
    </HeaderContainer>
  );
};

export default KmfHeader;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  text-align: center;
  width: 100%;
  background-color: #1574bd;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    padding: 0 80px;
    font-family: 'NotoSans';
    font-size: 21px;
    color: white;
  }
  .btn-holder {
    position: absolute;
    top: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    justify-content: center;

    &.left{
      left:0;
    }

    &.right{
      right:0;
    }

    ${BasicButton} {
      border:none;

      button {
        width:40px;
        margin: 0 5px;
      }

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
