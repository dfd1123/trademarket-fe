import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import useService from '@/hooks/useService';
import TextInput from '@/views/components/common/input/TextInput';
import FooterButton from '@/views/components/common/FooterButton';
import useToast from '@/hooks/useToast';

const intialInput = {
  password: '',
  password_confirmation: '',
};

const PasswordResetForm = () => {
  const services = useService();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputs, setInputs] = useState(intialInput);
  const [correct, setCorrect] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (value: any, name: string) => {
    console.log(name, value);
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = async () => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if(!email || !token){
      toast('유효하지 않은 요청입니다. 관리자에게 문의하세요.');
      return;
    }
    const data = { ...inputs, email, token};
    await services.user.resetPw(data);
    toast('비밀번호가 재설정 되었습니다. 다시 로그인 해주세요.', {type:'success'});
    navigate('/emailLogin');
  };

  useEffect(() => {
    setCorrect(inputs.password === inputs.password_confirmation);
  }, [inputs]);

  return (
    <PasswordResetFormStyle>
      <TextInput
        type="password"
        name="password"
        label="새 비밀번호"
        placeholder=""
        reset
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        name="password_confirmation"
        label="비밀번호 확인"
        reset
        onChange={handleInputChange}
        onEnter={submitHandler}
      />
      {inputs.password_confirmation ? (
        <span className={`status ${correct ? 'correct' : 'incorrect'}`}>
          {correct ? '비밀번호가 일치합니다' : '비밀번호가 불일치합니다.'}
        </span>
      ) : (
        ''
      )}
      <FooterButton disabled={!correct} onClick={submitHandler}>재설정</FooterButton>
    </PasswordResetFormStyle>
  );
};

const PasswordResetFormStyle = styled.div`
  ${TextInput} {
    width: 100%;
    margin-bottom: 13px;
  }

  .status {
    display: block;
    margin-top: -5px;
    padding:0 3px;
    font-size: 12px;
    &.correct {
      color: blue;
    }

    &.incorrect {
      color: red;
    }
  }
`;

export default PasswordResetForm;
