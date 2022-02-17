import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfLinkedList from '@/views/components/common/listView/KmfLinkedList';
import SearchBox from '@/views/components/referenceRoom/SearchBox';
import referenceService from '@/services/ReferenceService';
import { dateFormat } from '@/utils/dateUtils';
import { RefrenceDataType } from '@/services/types/Reference';

const ReferenceRoom = () => {
  const [list, setList] = useState<RefrenceDataType[]>([]);

  const searchReference = async (searchKeyword = '') => {
    console.log(searchKeyword);
    const {archives, archives_count} = await referenceService.getReferenceList({searchKeyword, limit:30, offset:0});
    setList(archives);
  };

  useEffect(() => {
    searchReference();
  }, []);

  return (
    <ReferenceRoomStyle>
      <KmfHeader headerText="자료실" />
      <SearchBox search={searchReference} />
      <span className="item-cnt">총 {list.length} 건</span>
      <div className="list-holder">
        {list.map(item => (
          <KmfListWrapper key={`ref-${item.ar_id}`} imgUrl={item.ar_file ? 'img/kmf/download.png' : ''}>
            <KmfLinkedList
              title={item.ar_title}
              to="/info"
              date={dateFormat(new Date(item.created_at), 'yyyy - MM - dd')}
            />
          </KmfListWrapper>
        ))}
      </div>
      <KmfFooter />
    </ReferenceRoomStyle>
  );
};

const ReferenceRoomStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  .search-box {
    background-color: #1574bd;
    padding: 16px;
    .search-inp {
      width: 100%;
    }
  }

  .item-cnt {
    display: block;
    width: 100%;
    height: 22px;
    font-size: 12px;
    margin: 20px 16px 0px 16px;
    color: #828282;
  }

  .list-holder {
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > div {
      margin: 0 16px;
      border-bottom: 1px solid #f1f1f1;
    }
  }
`;

export default ReferenceRoom;
