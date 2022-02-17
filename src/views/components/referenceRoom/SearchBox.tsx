import React, { useState, useEffect } from 'react';
import { BasicInput } from '@/views/components/common/input/TextInput';

interface PropsType {
  search: (text: string) => void;
}

const SearchBox = ({ search }: PropsType) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="search-box">
      <BasicInput
        name="search"
        type="search"
        value={searchValue}
        reset={true}
        className="search-inp"
        onChange={setSearchValue}
        onEnter={search}
      />
    </div>
  );
};

export default SearchBox;
