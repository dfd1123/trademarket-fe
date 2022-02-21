import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { setAuth } from '@/store/auth/auth';
import useToast from '@/hooks/useToast';
import useService from '@/hooks/useService';
import TextInput from '@/views/components/common/input/TextInput';
import AddressInput from '@/views/components/common/input/AddressInput';
import FooterButton from '@/views/components/common/FooterButton';
import DateSelectInput from '@/views/components/common/input/DateSelectInput';

const intialInput = {
  name: '',
  email: '',
  birth: '',
  phone: '',
  company: '',
  address1: '',
  address2: '',
  password: '',
  password_confirm: '',
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useService();
  const [inputs, setInputs] = useState(intialInput);
  const [correct, setCorrect] = useState(false);
  const [validate, setValidate] = useState(false);
  const { toast } = useToast();

  const checkValidate = () => {
    let check = Object.values(inputs).every((input) => Boolean(input));
    check = inputs.password.length >= 8 && inputs.password.length <= 20;
    setValidate(check);
  };

  const handleInputChange = (value: any, name: string) => {
    console.log(name, value);
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = async () => {
    const data = { ...inputs };
    console.log(data);
    const result = await services.user.register(inputs);

    if (result.accessToken) {
      dispatch(setAuth(result));
      toast('회원가입이 완료되었습니다. 관리자 승인 후 이용 가능하십니다.', {
        type: 'success',
      });
      navigate('/mypage');
    }
  };

  useEffect(() => {
    checkValidate();
    setCorrect(
      inputs.password === inputs.password_confirm &&
        Boolean(inputs.password && inputs.password_confirm)
    );
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
          name="birth"
          label="생년월일"
          placeholder="날짜를 선택해주세요."
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="phone"
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
          name="company"
          label="현재 소속사"
          reset
          onChange={handleInputChange}
        />
        <AddressInput
          name="address1"
          label="소속사 주소"
          placeholder="주소를 검색하세요."
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="address2"
          placeholder="상세주소를 입력해주세요."
          reset
          onChange={handleInputChange}
        />
      </div>
      <div className="article">
        <h6>접속정보</h6>
        <TextInput
          type="email"
          name="email"
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
        {inputs.password &&
        (inputs.password.length < 8 || inputs.password.length > 20) ? (
          <span className={`status incorrect`}>
            8자리에서 20자리 이하로 입력해주세요.
          </span>
        ) : (
          ''
        )}
        <TextInput
          type="password"
          name="password_confirm"
          label="비밀번호 확인"
          reset
          onChange={handleInputChange}
          onEnter={submitHandler}
        />
        {inputs.password_confirm ? (
          <span className={`status ${correct ? 'correct' : 'incorrect'}`}>
            {correct ? '비밀번호가 일치합니다' : '비밀번호가 불일치합니다.'}
          </span>
        ) : (
          ''
        )}
      </div>
      <FooterButton disabled={!correct || !validate} onClick={submitHandler}>
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

export default RegisterForm;
