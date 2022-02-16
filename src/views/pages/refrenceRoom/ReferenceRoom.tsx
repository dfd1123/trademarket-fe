import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfLinkedList from '@/views/components/common/listView/KmfLinkedList';
import { dateFormat } from '@/utils/dateUtils';
import {
  BasicInput,
  MerterialInput,
} from '@/views/components/common/input/TextInput';

const ReferenceRoom = () => {
  const [searchValue, setSearchValue] = useState('');
  const [listCount, setListCount] = useState(0);

  const onChange = (value, name) => {
    console.log(value, name);
    setSearchValue(`${searchValue}${value}`);
  };

  // useEffect(() => {
  //   console.log('search value', searchValue);
  // }, [searchValue]);

  return (
    <ContainerStyle>
      <KmfHeader headerText="자료실" />
      <SearchContainerStyle>
        <SearchInputStyle
          name="search"
          type="search"
          value={searchValue}
          reset={true}
          onChange={onChange}
        />
      </SearchContainerStyle>
      <TotalFieldStyle>총 {listCount} 건</TotalFieldStyle>
      <ListWrapperStyle>
        <KmfListWrapper imgUrl="img/kmf/download.png">
          <KmfLinkedList
            title="2월 콘텐츠창작 지원사업"
            to="/info"
            date={dateFormat(new Date(), 'yyyy - MM - dd')}
          />
        </KmfListWrapper>
        <KmfListWrapper imgUrl="img/kmf/download.png">
          <KmfLinkedList
            title="2월 콘텐츠창작 지원사업"
            to="/info"
            date={dateFormat(new Date(), 'yyyy - MM - dd')}
          />
        </KmfListWrapper>
        <KmfListWrapper imgUrl="img/kmf/download.png">
          <KmfLinkedList
            title="2월 콘텐츠창작 지원사업"
            to="/info"
            date={dateFormat(new Date(), 'yyyy - MM - dd')}
          />
        </KmfListWrapper>
        <KmfListWrapper imgUrl="img/kmf/download.png">
          <KmfLinkedList
            title="2월 콘텐츠창작 지원사업"
            to="/info"
            date={dateFormat(new Date(), 'yyyy - MM - dd')}
          />
        </KmfListWrapper>
        <KmfListWrapper imgUrl="img/kmf/download.png">
          <KmfLinkedList
            title="2월 콘텐츠창작 지원사업"
            to="/info"
            date={dateFormat(new Date(), 'yyyy - MM - dd')}
          />
        </KmfListWrapper>
        <KmfListWrapper imgUrl="img/kmf/download.png">
          <KmfLinkedList
            title="Incididunt nulla non veniam proident Lorem consequat pariatur. Non ut culpa cillum ullamco cillum do officia aute aliqua proident laboris irure consequat. Sint mollit dolore cillum fugiat elit reprehenderit deserunt dolor culpa duis eu aliqua. Eu est dolore est cupidatat amet. Deserunt sit ullamco dolore reprehenderit deserunt sint laboris sit. Est non magna non pariatur sit aute minim pariatur consequat veniam qui et ad. Ea ea elit voluptate veniam cupidatat est minim duis elit velit deserunt cillum.

Ex aute ex exercitation anim. Tempor pariatur esse fugiat adipisicing sint ad eu magna quis cillum sint enim irure. Dolor adipisicing et velit dolor tempor Lorem mollit amet culpa ad. Ullamco eu dolor ullamco proident aute ad. Dolore labore mollit laboris Lorem aute sint duis."
            to="/info"
            date={dateFormat(new Date(), 'yyyy - MM - dd')}
          />
        </KmfListWrapper>
      </ListWrapperStyle>
      <FooterStyle />
    </ContainerStyle>
  );
};

const TotalFieldStyle = styled.div`
  width: 100%;
  height: 22px;
  font-size: 12px;
  margin: 20px 16px 0px 16px;
  color: #828282;
`;

const ListWrapperStyle = styled.ul`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > li {
    margin: 0 16px;
    border-bottom: 1px solid #f1f1f1;
  }
`;

const ContainerStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FooterStyle = styled(KmfFooter)`
  margin-top: auto;
`;

const SearchContainerStyle = styled.div`
  background-color: #1574bd;
  padding: 16px;
`;

const SearchInputStyle = styled(BasicInput)`
  width: 100%;
  & input {
    width: 100%;
    border: 1px solid #ececec;
    border-radius: 5px;
  }
`;

export default ReferenceRoom;
