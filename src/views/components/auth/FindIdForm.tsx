import { useState } from 'react';
import styled from 'styled-components';
import useService from '@/hooks/useService';
import TextInput from '@/views/components/common/input/TextInput';
import BasicButton from '@/views/components/common/Button';
import useDialog from '@/hooks/useDialog';

const intialInput = {
  name: '',
  phone: '',
};

const FindIdForm = () => {
  const services = useService();
  const [inputs, setInputs] = useState(intialInput);
  const [result, setResult] = useState('');
  const {alert} = useDialog();

  const handleInputChange = (value: any, name: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const submitHandler = async () => {
    const data = { ...inputs };
    data.phone = data.phone.replace(/-/gi, '');
    
    const {email} = await services.user.findId(inputs);
    setResult(email);
  };

  const passwordResetting = async () => {
    await services.user.sendResetPasswordEmail({email: result});
    alert('비밀번호를 재설정할 수 있는 링크를 가입시 등록하신 이메일로 발송했어요.', {title:'메일발송'});
  }

  return (
    <FindIdFormStyle>
      <TextInput
        type="name"
        name="name"
        label="이름"
        placeholder="이름을 입력해주세요."
        reset
        onChange={handleInputChange}
      />
      <TextInput
        type="text"
        name="phone"
        label="전화번호"
        placeholder="숫자만 입력"
        number
        reset
        onChange={handleInputChange}
        onEnter={submitHandler}
      />
      <div className="btn-holder">
        <BasicButton disabled={!inputs.name || !inputs.phone} onClick={submitHandler}>아이디 찾기</BasicButton>
      </div>
      {result ? (
        <>
          <div className="find-id-result">
            <span>등록하신 아이디는...</span>
            <strong>{result}</strong>
          </div>
          <div className="btn-holder">
            <BasicButton onClick={passwordResetting}>비밀번호 재설정</BasicButton>
          </div>
        </>
      ) : (
        ''
      )}
    </FindIdFormStyle>
  );
};

const FindIdFormStyle = styled.div`
  ${TextInput} {
    width: 100%;
    margin-bottom: 13px;
  }

  .find-id-result{
      margin: 16px 0;
      padding: 16px;
      background-color: #F4F4F4;
      border-radius: 5px;

      >span{
          display:block;
          margin-bottom: 17px;
          font-size:12px;
          line-height:17px;
          color:#757575;
      }

      >strong{
          display:block;
          text-align:center;
          font-size: 24px;
          color:#757575;
          line-height: 35px;
      }
  }

  .btn-holder {
    ${BasicButton} {
      display: block !important;
      width:100%;
      height: 45px;
      margin-bottom: 16px;
      border:none;

      > button {
        font-size: 12px;
        line-height: 14px;
        color: #4f4f4f;
        text-decoration: underline;
        text-decoration-color: #a8a7a7;
        border: 1px solid #d2d2d2;

        &:disabled{
            opacity: 0.4;
        }
      }
    }
  }
`;

export default FindIdForm;
