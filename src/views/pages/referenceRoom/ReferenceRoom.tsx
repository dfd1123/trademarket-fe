import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useService from '@/hooks/useService';
import { RefrenceDataType } from '@/services/types/Reference';
import { dateFormat } from '@/utils/dateUtils';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import SearchBox from '@/views/components/referenceRoom/SearchBox';
import ReferenceList from '@/views/components/referenceRoom/ReferenceList';

const ReferenceRoom = () => {
  const services = useService();
  const [list, setList] = useState<RefrenceDataType[]>([]);

  const searchReference = async (searchKeyword = '') => {
    const { archives, archives_count } =
      await services.reference.getReferenceList({
        searchKeyword,
        limit: 30,
        offset: 0,
      });
    setList(archives);
  };

  useEffect(() => {
    searchReference();
  }, []);

  return (
    <ReferenceRoomStyle>
      <KmfHeader headerText="자료실" prev />
      <SearchBox search={searchReference} />
      <span className="item-cnt">총 {list.length} 건</span>
      <div className="list-holder">
        {list.map((item) => (
          <KmfListWrapper key={`ref-${item.ar_id}`}>
            <ReferenceList
              id={item.ar_id}
              title={item.ar_title}
              // type="download"
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
  overflow: hidden;

  .item-cnt {
    display: block;
    width: 100%;
    height: 22px;
    font-size: 12px;
    margin: 20px 16px 0px 16px;
    color: #828282;
  }

  .list-holder {
    > div {
      width: calc(100% - 32px);
      margin: 0 auto;
      border-bottom: 1px solid #f1f1f1;
      background-image:none;
    }
  }
`;

export default ReferenceRoom;
