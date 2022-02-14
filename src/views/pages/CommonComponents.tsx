import React, {useState, useRef, useEffect} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BasicButton } from '@/views/components/common/Button';
import styled from 'styled-components';
import TextInput, {MerterialInput} from '@/views/components/common/input/TextInput';
function CommonComponents() {

    const initialInputs = {
        name: '', 
        age: 0,
        address: '',
        search: ''
    };

    const [inputs, setInputs] = useState(initialInputs);

    const {name, age, address, search} = inputs;

    const handleChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;

        setInputs({...inputs, [name]: value});
    }

    // useEffect(() => {

    // }, [inputs])



  return (
    <CommonComponentsStyle>
      <h1>컴포넌트's</h1>
      <div className="contents">
        {name}
          <TextInput label="이름" name="name" value={name} change={handleChangeInput}  /><br /><br />
          <TextInput label="검색" name="search" type="search" value={search} reset={true} change={handleChangeInput}  /><br /><br />
          <MerterialInput label="나이" name="age" value={age} change={handleChangeInput}  /><br /><br />
          <MerterialInput label="주소" name="address" type="address" value={address} reset={true} change={handleChangeInput}  />
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
