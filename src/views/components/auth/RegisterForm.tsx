import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useService from '@/hooks/useService';
import TextInput from '@/views/components/common/input/TextInput';
import AddressInput from '@/views/components/common/input/AddressInput';
import useDialog from '@/hooks/useDialog';
import FooterButton from '@/views/components/common/FooterButton';
import DateSelectInput from '../common/input/DateSelectInput';

const intialInput = {
  name: '',
  birthday: '',
  phone_number: '',
  agency: '',
  agency_address: '',
  agency_address_detail: '',
  password: '',
  confirmPassword: '',
};

const PasswordResetForm = () => {
  const services = useService();
  const [inputs, setInputs] = useState(intialInput);
  const [correct, setCorrect] = useState(false);
  const { alert } = useDialog();

  const handleInputChange = (value: any, name: string) => {
    console.log(name, value);
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = async () => {
    const data = { ...inputs };
    console.log(data);
    // await services.user.emailLogin(inputs);
  };

  useEffect(() => {
    setCorrect(inputs.password === inputs.confirmPassword);
  }, [inputs]);

  return (
    <PasswordResetFormStyle>
      <div className="article">
        <h6>기본정보</h6>
        <TextInput
          type="text"
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          reset
          onChange={handleInputChange}
        />
        <DateSelectInput
          name="birthday"
          label="생년월일"
          placeholder="날짜를 선택해주세요."
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="phone_number"
          label="연락처"
          placeholder="숫자만 입력해주세요."
          number
          reset
          onChange={handleInputChange}
        />
      </div>
      <div className="article">
        <h6>소속사정보</h6>
        <TextInput
          type="text"
          name="agency"
          label="현재 소속사"
          reset
          onChange={handleInputChange}
        />
        <AddressInput
          name="agency_address"
          label="소속사 주소"
          placeholder="주소를 검색하세요."
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="agency_address_detail"
          placeholder="상세주소를 입력해주세요."
          reset
          onChange={handleInputChange}
        />
      </div>
      <div className="article">
        <h6>접속정보</h6>
        <TextInput
          type="password"
          name="password"
          label="아이디"
          placeholder="abc@mail.com"
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="password"
          name="password"
          label="비밀번호"
          placeholder="8~20자리의 영대소문, 숫자 사용"
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          reset
          onChange={handleInputChange}
          onEnter={submitHandler}
        />
        {inputs.confirmPassword ? (
          <span className={`status ${correct ? 'correct' : 'incorrect'}`}>
            {correct ? '비밀번호가 일치합니다' : '비밀번호가 불일치합니다.'}
          </span>
        ) : (
          ''
        )}
      </div>
      <FooterButton disabled={!correct} onClick={submitHandler}>
      KMF 멤버스 가입신청
      </FooterButton>
    </PasswordResetFormStyle>
  );
};

const PasswordResetFormStyle = styled.div`
  padding-bottom: 80px;
  .article {
    margin-bottom: 56px;
    h6 {
      margin-bottom: 16px;
      font-size: 13px;
      font-weight: 500;
      color: #000;
      line-height: 17px;
    }

    ${TextInput} {
      width: 100%;
      margin-bottom: 13px;
    }

    .status {
      display: block;
      margin-top: -5px;
      padding: 0 3px;
      font-size: 12px;
      &.correct {
        color: blue;
      }

      &.incorrect {
        color: red;
      }
    }
  }
`;

export default PasswordResetForm;
