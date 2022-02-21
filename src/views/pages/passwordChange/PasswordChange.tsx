import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import {
  BasicInput,
} from '@/views/components/common/input/TextInput';
import DateSelectInput from '@/views/components/common/input/DateSelectInput';
import FooterButton from '@/views/components/common/FooterButton';
import BasicButton from '@/views/components/common/Button';

const PasswordChange = () => {
  const [password, setPassword] = useState('');
  const [correct, setCorrect] = useState(false);

  const passwordOnChange = (value: string, name: string) => {
    console.log('pwd', value);
    setPassword(value);
  }

  const confirmCorrectPassword = (value: string, name: string) => {
    setCorrect(value === password);
  }

  useEffect(() => {
    console.log(correct);
    password.length === 0 && setCorrect(true);
  }, [password, correct])

  return (
    <ContainerStyle>
      <KmfHeader
        headerText={'비밀번호 변경'}
        prev
      />
      <ContentWrapperStyle>
        <div className="input-form">
          <BasicInput className="password-input" name="prev" placeholder="기존 비밀번호를 입력해주세요." label="기존 비밀번호" type={"password"} />
          <div className={"pwd-validation"}>{!correct && 'asdfsadf'}</div>
          <BasicInput className="password-input" name="current" placeholder="새로운 비밀번호를 입력해주세요." label="새로운 비밀번호" type={"password"} onChange={passwordOnChange}/>
          <BasicInput className="password-input" name="current-check" placeholder="비밀번호 확인" label="비밀번호 확인" type={"password"} onChange={confirmCorrectPassword}/>
        <div className="kmf-fighting">KMF 화이팅!</div>
        </div>
      </ContentWrapperStyle>
      <FooterStyle>저장하기</FooterStyle>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapperStyle = styled.section`
  height: calc(100vh - 106px);
  /* height: 100vh; */
  overflow: scroll;
  font-size: 14px;
  line-height: 20px;

  .input-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  .password-input {
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
  .kmf-fighting {
    /* height: 128px; */
    padding: 20px;
    text-align: center;
    color: #acacac;
  }

  .pwd-validation {
    color: red;
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

const FooterStyle = styled(BasicButton)`
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

export default PasswordChange;
