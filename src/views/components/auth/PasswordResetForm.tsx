import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useService from '@/hooks/useService';
import TextInput from '@/views/components/common/input/TextInput';
import BasicButton from '@/views/components/common/Button';
import useDialog from '@/hooks/useDialog';
import FooterButton from '@/views/components/common/FooterButton';

const intialInput = {
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
