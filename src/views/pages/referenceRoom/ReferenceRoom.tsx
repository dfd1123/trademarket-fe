import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RefrenceDataType } from '@/services/types/Reference';
import { dateFormat } from '@/utils/dateUtils';
import useService from '@/hooks/useService';
import useScrollMove from '@/hooks/useScrollMove';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import SearchBox from '@/views/components/referenceRoom/SearchBox';
import ReferenceList from '@/views/components/referenceRoom/ReferenceList';

const ReferenceRoom = () => {
  const services = useService();
  const [list, setList] = useState<RefrenceDataType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { scrollInfos, scrollRemove } = useScrollMove({
    page: 'ref-list',
    path: '/ref',
  });

  const getRefList = (refresh: boolean = false) => {
    searchReference('', refresh ? 0 : list.length);
  };

  const searchReference = async (searchKeyword = '', offset: number = 0) => {
    if (list.length && list.length === totalCount && offset) return;

    const { archives, archives_count } =
      await services.reference.getReferenceList({
        searchKeyword,
        limit: 30,
        offset: 0,
      });

    if (totalCount !== archives_count) setTotalCount(archives_count);
    if (!offset) {
      window.scrollY = 0;
      setList(archives);
    } else setList([...list, ...archives]);
  };

  useEffect(() => {
    if (list.length === 0) getRefList(true);
  }, []);

  useEffect(() => {
    if (scrollInfos) {
      window.scrollTo(0, scrollInfos);
      const scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      //현재위치와 복구위치가 같다면
      if (scrollTop == scrollInfos) {
        scrollRemove();
      }
    }
    //의존성 배열에 fetching 해오는 데이터를 넣어준다.
  }, [scrollInfos, scrollRemove, list]);

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
              date={item.created_at}
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
      background-image: none;
    }
  }
`;

export default ReferenceRoom;
