import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useToast from '@/hooks/useToast';
import useService from '@/hooks/useService';
import useTranslate from '@/hooks/useTranslate';
import TextInput from '@/views/components/common/input/TextInput';
import { YellowButton } from '@/views/components/common/Button';

const intialInput = {
  szCustNo: '', // email
  szFamilyName: '', // NickName
  szMemberNo: '000',
  szTelNo2: '', // phone number
  szUserName: '', // invite code
  szNation_Name: '', // country code
  szPasswd: '', // password
  szPasswd1: '', // password confirm
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslate('auth.register');
  const services = useService();
  const [inputs, setInputs] = useState(intialInput);
  const [correct, setCorrect] = useState(false);
  const [validate, setValidate] = useState(false);

  const {registerRes, registerFetchData} = services.user.register();

  const checkValidate = () => {
    let check = Object.values(inputs).every((input) => Boolean(input));
    check = inputs.szPasswd.length >= 8 && inputs.szPasswd.length <= 20;
    setValidate(check);
  };

  const handleInputChange = (value: any, name: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = () => {
    registerFetchData({...inputs});
  };

  useEffect(() => {
    checkValidate();
    setCorrect(
      inputs.szPasswd === inputs.szPasswd1 &&
        Boolean(inputs.szPasswd && inputs.szPasswd1)
    );
  }, [inputs]);

  useEffect(() => {
    if (registerRes) {
      if (registerRes.Message.flag === '0') {
        navigate('/');
      }
    }
  }, [registerRes]);

  return (
    <RegisterFormStyle>
      <div className="article">
        <TextInput
          type="email"
          name="szCustNo"
          label={t('_.email')}
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="password"
          name="szPasswd"
          label={t('_.password')}
          reset
          onChange={handleInputChange}
        />
        {inputs.szPasswd &&
        (inputs.szPasswd.length < 8 || inputs.szPasswd.length > 20) ? (
          <span className={`status incorrect`}>{t('_.passwordRule')}</span>
        ) : (
          ''
        )}
        <TextInput
          type="password"
          name="szPasswd1"
          label={t('_.confirmPassword')}
          reset
          onChange={handleInputChange}
          onEnter={submitHandler}
        />
        {inputs.szPasswd1 ? (
          <span className={`status ${correct ? 'correct' : 'incorrect'}`}>
            {correct ? t('_.correctPassword') : t('_.incorrectPassword')}
          </span>
        ) : (
          ''
        )}
        <TextInput
          type="text"
          name="szFamilyName"
          label={t('_.nickname')}
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="szUserName"
          label={t('_.inviteCode')}
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="szNation_Name"
          label={t('_.countryCode')}
          reset
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          name="szTelNo2"
          label={t('_.phoneNumber')}
          reset
          onChange={handleInputChange}
        />
      </div>
      <YellowButton disabled={!correct || !validate} onClick={submitHandler}>
        {t('_.request')}
      </YellowButton>
    </RegisterFormStyle>
  );
};

const RegisterFormStyle = styled.div`
  .article {
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
      font-size: 13px;

      input {
        height: 50px;
        padding: 0 10px;
      }

      label {
        left: 10px;
      }

      &.focus-value {
        label {
          top: -11px;
          color: #000;
        }
      }
    }

    .status {
      display: block;
      margin-top: -5px;
      margin-bottom: 15px;
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

  ${YellowButton} {
    max-width: 380px;
    width: 100%;
    height: 48px;
    margin: 0 auto;
    font-size: 15px;
    font-weight: 700;
    border-radius: 4px;

    &.disabled{
      border:1px solid #ccc;
      background-color:#ccc;
    }
  }
`;

export default RegisterForm;
