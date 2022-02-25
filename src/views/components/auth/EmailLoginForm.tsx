import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useService from '@/hooks/useService';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/auth/auth';
import TextInput from '@/views/components/common/input/TextInput';
import FooterButton from '@/views/components/common/FooterButton';

const intialInput = {
  email: '',
  password: '',
};

const EmailLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useService();
  const [inputs, setInputs] = useState(intialInput);

  const handleInputChange = (value: any, name: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = async () => {
    const { access_token } = await services.user.emailLogin(inputs);

    if (access_token) {
      const user = await services.user.getMyUserInfo();

      dispatch(setAuth({ user, access_token }));

      navigate('/notice');
    }
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
        onEnter={submitHandler}
      />
      <FooterButton
        disabled={!inputs.email || !inputs.password}
        onClick={submitHandler}>
        로그인
      </FooterButton>
    </>
  );
};

export default EmailLoginForm;
