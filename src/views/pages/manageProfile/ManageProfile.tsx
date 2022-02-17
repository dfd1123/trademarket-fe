import React from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import {
  BasicInput,
  MerterialInput,
} from '@/views/components/common/input/TextInput';
import DateSelectInput from '@/views/components/common/input/DateSelectInput';

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
        <InputFormStyle>
          <p className='title'>기본정보</p>
          <TextInputStyle name="이름" placeholder="이름을 입력해주세요." label="이름"></TextInputStyle>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
          <h1>sadfdsf</h1>
        </InputFormStyle>
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

const InputFormStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;

  .title {
    font-size: 12px;
    margin-bottom: 14px;
  }
`;

const TextInputStyle = styled(BasicInput)`
  width: 100%;
  margin-bottom: 14px;
  input {
    width: 100%;
  }
  label {
    font-size: 12px;
    color: #1e1e1e;
  }
`;

export default ManageProfile;
