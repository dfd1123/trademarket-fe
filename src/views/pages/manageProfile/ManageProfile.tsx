import React from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import {
  BasicInput,
} from '@/views/components/common/input/TextInput';
import DateSelectInput from '@/views/components/common/input/DateSelectInput';
import FooterButton from '@/views/components/common/FooterButton';
import BasicButton from '@/views/components/common/Button';

const ManageProfile = () => {
  return (
    <ContainerStyle>
      <KmfHeader
        headerText={'프로필관리'}
        prevLink="d"
        prevImgUrl="img/kmf/leftArrow.png"
      />
      <ContentWrapperStyle>
        <ImageContainer>
          <img src="img/kmf/profile_image.jpg" />
          <FindImage imgUrl="img/kmf/find_img.png"></FindImage>
        </ImageContainer>
        <div className="input-form">
          <p className='title'>기본정보</p>
          <BasicInput className="text-input input-name" name="name" placeholder="이름을 입력해주세요." label="이름" />
          <BasicInput className="text-input" name="birth" placeholder="날짜를 선택해주세요." label="생년월일" />
          <BasicInput className="text-input" name="phone" placeholder="숫자만 입력해주세요." label="연락처" />

          <p className='title info'>소속사 정보</p>
          <BasicInput className="text-input input-company" name="company" placeholder="" label="현재 소속사" />
          <BasicInput className="text-input input-address" name="address" placeholder="주소를 검색해주세요." label="소속사 주소" />
          <BasicInput className="text-input input-full-address" name="full-address" placeholder="상세주소를 입력해주세요." />
          <BasicInput className="text-input input-artist" name="artist" placeholder="담당 아티스트명을 알려주세요." label="담당 아티스트" />

          <p className='title info'>등록정보</p>
          <p className="id">아이디</p>
          <p className="email">asdf@naver.com</p>
        </div>
        <div className="kmf-fighting">KMF 화이팅!</div>
        <BasicButton>저장하기</BasicButton>
      </ContentWrapperStyle>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapperStyle = styled.section`
  height: calc(100vh - 46px);
  overflow: scroll;
  font-size: 14px;
  line-height: 20px;

  .input-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .title {
      font-size: 12px;
      margin-bottom: 14px;
    }

    .info {
      margin-top: 20px;
    }
  }

  .text-input {
    width: 100%;
    margin-bottom: 14px;
    input {
      width: 100%;
    }
    label {
      font-size: 14px;
      color: #1e1e1e;
    }
    input[name~="address"] {
      margin-bottom: -6px;
    }
  }

  .input-name {
    label{
      font-size: 12px;
    }
  }

  .id {
    font-size: 14px;
      color: #1e1e1e;
  }

  .email {
    font-size: 14px;
    color: black;
  }

  .kmf-fighting {
    /* height: 128px; */
    padding: 20px;
    text-align: center;
    color: #acacac;
  }

  ${BasicButton} {
    display: flex;
    height: 60px;
    width: 100%;
    background-color: #1574bd;
    justify-content: center;
    align-items: center;
    border-radius: 0 !important;
    > button {
      color: white;
      font-size: 17px;
      font-weight: 500;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 262px;
  position: relative;

  img {
    width: 100%;
    height: 262px;
    object-fit: cover;
  }
`;

const FindImage = styled.div<{ imgUrl?: string }>`
  width: 80px;
  height: 80px;
  position: absolute;
  top: 111px;
  left: calc(50% - 20px);
  z-index: 1;
  display: flex;
  background-image: url(${props => props.imgUrl});
  background-size: 40px;
  background-repeat: no-repeat;
`;

export default ManageProfile;
