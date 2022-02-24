import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import noticeBg from '@/assets/img/kmf/bg/notice-bg-img.jpg';
import kmfLogo from '@/assets/img/kmf/kmf-logo.svg';
import useService from '@/hooks/useService';
import { NoticeInfo, NoticeListResponse } from '@/services/types/Notice';
import { dateFormat } from '@/utils/dateUtils';
import InfiniteScroll from '@/views/components/common/InfiniteScroll';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import NoticeHead from '@/views/components/notice/NoticeHead';
import useScrollMove from '@/hooks/useScrollMove';
import KmfFooter from '@/views/components/layouts/KmfFooter';

const NoticeList = () => {
  const services = useService();
  const [list, setList] = useState<NoticeInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { scrollInfos, scrollRemove } = useScrollMove({
    page: 'notice-list',
    path: '/notice',
  });

  const getNotice = async () => {
    if (list.length && list.length === totalCount) return;

    const result: NoticeListResponse = await services.notice.getNoticeList({
      offset: list.length,
      limit: 30,
    });
    setTotalCount(result.notices_count);
    setList([...list, ...result.notices]);
  };

  useEffect(() => {
    if (list.length === 0) getNotice();
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
    <NoticeListStyle>
      <div className="noti-hd">
        <div className="logo"></div>
        {list[0] ? (
          <Link to={`/notice/${list[0].no_id}`}>
            <div className="first-noti">
              <h2 className="tit">{list[0].no_title}</h2>
              <span className="date">
                {dateFormat(new Date(list[0].created_at), 'yyyy - MM- dd')}
              </span>
            </div>
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className="list-holder">
        <InfiniteScroll loadMore={getNotice}>
          {list.map((notice) => (
            <KmfListWrapper key={notice.no_id} className="no-list">
                <Link to={`/notice/${notice.no_id}`}>
                  <NoticeHead
                    id={notice.no_id}
                    type={notice.no_type}
                    title={notice.no_title}
                    date={notice.created_at}
                  />
                </Link>
            </KmfListWrapper>
          ))}
        </InfiniteScroll>
      </div>
      <KmfFooter />
    </NoticeListStyle>
  );
};

const NoticeListStyle = styled.div`
  padding-bottom:70px;
  .noti-hd {
    position: relative;
    height: 250px;
    padding: 16px;
    background-image: url(${noticeBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .logo {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 46px;
      background-color: rgba(53, 53, 53, 0.5);
      background-image: url(${kmfLogo});
      background-repeat: no-repeat;
      background-size: 66px;
      background-position: center;
    }

    .first-noti {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      padding: 16px;

      .tit {
        font-size: 21px;
        font-weight: 600;
        color: #fff;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }

      .date {
        margin-top: 4px;
        font-size: 12px;
        color: #fff;
      }
    }
  }

  .list-holder {
    padding: 0 16px;
    margin-bottom: 20px;

    .no-list {
      padding-top: 16px;
      padding-bottom: 0;
      background-position: right center;
      border-bottom: 1px solid #f1f1f1;
      &:nth-last-child(2) {
        border-bottom: none;
      }
    }
  }
`;

export default NoticeList;
