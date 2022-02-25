import { useState } from 'react';
import styled from 'styled-components';
import { BasicInput } from '@/views/components/common/input/TextInput';

interface PropsType {
  search: (text: string) => void;
}

const SearchBox = ({ search }: PropsType) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchBoxStyle>
      <BasicInput
        name="search"
        type="search"
        value={searchValue}
        reset={true}
        className="search-inp"
        placeholder="키워드로 검색"
        onChange={setSearchValue}
        onEnter={search}
      />
    </SearchBoxStyle>
  );
};

const SearchBoxStyle = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  background-color: #1574bd;
  padding: 16px;

  .search-inp {
    width: 100%;
  }
`;

export default SearchBox;
