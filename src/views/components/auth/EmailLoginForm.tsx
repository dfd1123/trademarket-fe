import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '@/services/UserService';
import TextInput from '@/views/components/common/input/TextInput';
import FooterButton from '@/views/components/common/FooterButton';
import useService from '@/hooks/useService';

const intialInput = {
  email: '',
  password: '',
};

const EmailLoginForm = () => {
  const navigate = useNavigate();
  const services = useService();
  const [inputs, setInputs] = useState(intialInput);

  const handleInputChange = (value: any, name: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await services.user.emailLogin(inputs);

    navigate('/ref');
  };

  return (
    <>
      <TextInput
        type="email"
        name="email"
        label="아이디"
        placeholder="이메일을 입력해주세요."
        reset
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        reset
        onChange={handleInputChange}
        onEnter={() => submitHandler(inputs)}
      />
      <FooterButton onClick={() => submitHandler(inputs)}>로그인</FooterButton>
    </>
  );
};

export default EmailLoginForm;
