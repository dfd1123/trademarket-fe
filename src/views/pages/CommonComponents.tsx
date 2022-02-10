import React, {useState, useRef} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BasicButton } from '@/views/components/common/Button';
import styled from 'styled-components';
import TextInput, {MerterialInput} from '@/views/components/common/input/TextInput';
function CommonComponents() {

    console.log('test');

    const initialInputs = {
        name: '', 
        age: 0
    };

    const [inputs, setInputs] = useState(initialInputs);

    const handleChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;

        setInputs({...inputs, [name]: value});
    }



  return (
    <CommonComponentsStyle>
      <h1>컴포넌트's</h1>
      <div className="contents">
          <TextInput label="이름" name="name" value={inputs.name} change={handleChangeInput}  /><br /><br />
          <MerterialInput label="나이" name="age" value={inputs.name} change={handleChangeInput}  />
      </div>
    </CommonComponentsStyle>
  );
}

const CommonComponentsStyle = styled.div`
  padding: 20px 25px;

  .contents {
    margin-top: 40px;
  }
`;

export default CommonComponents;
