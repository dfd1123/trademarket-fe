import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import useModal from '@/hooks/useModal';
import TextInput, {MerterialInput} from '@/views/components/common/input/TextInput';
import ModalDatePicker from '@/views/components/common/modal/ModalDatePicker';
import DateSelectInput from '@/views/components/common/input/DateSelectInput';
import CheckBox, {ButtonCheckBox} from '@/views/components/common/input/CheckBox';
import Loading from '../components/common/Loading';

function CommonComponents() {

    const initialInputs = {
        name: '', 
        age: 0,
        address: '',
        search: ''
    };

    const checkboxList = [
      {type: 'checkbox', name: '1', label: '1번', value: 1},
      {type: 'checkbox', name: '1', label: '2번', value: 2},
      {type: 'checkbox', name: '1', label: '3번', value: 3},
      {type: 'checkbox', name: '1', label: '4번', value: 4},
      {type: 'checkbox', name: '1', label: '5번', value: 5},
    ];


    const [inputs, setInputs] = useState(initialInputs);
    const [checkData, setCheckData] = useState([1,3,5]);

    const {name, age, address, search} = inputs;

    const {openModal} = useModal();

  const openDatePickerModal = async() => {
    const result = await openModal(ModalDatePicker);

    console.log(result);
  }

    const handleChangeInput = (value : any, name : any) => {
        setInputs({...inputs, [name]: value});
    }

    // useEffect(() => {

    // }, [inputs])



  return (
    <CommonComponentsStyle>
      <Loading scale={0.8} loading={true} />
      <h1>컴포넌트's</h1>
      <div className="contents">
        {name}
          <TextInput label="이름" name="name" value={name} onChange={handleChangeInput}  /><br /><br />
          <TextInput label="검색" name="search" type="search" value={search} reset={true} onChange={handleChangeInput}  /><br /><br />
          <MerterialInput label="나이" name="age" value={age} onChange={handleChangeInput}  /><br /><br />
          <MerterialInput label="주소" name="address" type="address" value={address} reset={true} onChange={handleChangeInput}  /><br /><br />
          <DateSelectInput /><br /><br />
          {checkboxList.map((item, index) => (<ButtonCheckBox data={checkData} type={item.type} label={item.label} name={item.name + 'rr'} value={item.value} key={`${item.name}${index}`} onChange={setCheckData} />))}<br/><br />
          {checkboxList.map((item, index) => (<CheckBox data={checkData} type={item.type} label={item.label} name={item.name} value={item.value} key={`${item.name}${index}`} onChange={setCheckData} />))}<br/><br />
          <button onClick={() => setCheckData([...checkData, 2])}>add</button>
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
