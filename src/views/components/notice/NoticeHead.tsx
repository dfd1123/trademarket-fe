import styled from 'styled-components';
import { dateFormat } from '@/utils/dateUtils';
import { useTypedSelector } from '@/store';

interface PropsType {
  id?: number;
  type?: number;
  date: string;
  title: string;
}

const NoticeHead = ({id,  type, date, title }: PropsType) => {
  const unreadNoticeList = useTypedSelector(state => state.noticeSlice.unreadNoticeList);
  const unread = unreadNoticeList.includes(id ?? -1);

  let noticeType = '';
  date = dateFormat(new Date(date), 'yyyy - MM - dd');

  switch (type) {
    case 1:
      noticeType = '공지사항';
      break;
    case 2:
      noticeType = '사업안내';
      break;
    case 3:
      noticeType = '경조사';
      break;
  }

  return (
    <NoticeHeadStyle>
      {noticeType ? (<span className={`label type-${type}`}>{noticeType}</span>) : ('')}
      <span className="date">{date}</span>
      {unread ? (<span className="new">new</span>) : ('')}
      <div className="title">
        {title}
      </div>
    </NoticeHeadStyle>
  );
};

const NoticeHeadStyle = styled.div`
.label {
        min-width: 70px;
        margin-right: 8px;
        padding: 4px 13px;
        font-size: 12px;
        line-height: 17px;
        color: #fff;
        text-align: center;
        border-radius: 3px;
        background-color: #28a8e1;

        &.type-{
            &1{
                background-color: #28a8e1;
            }
            &2{
                background-color: #A7CD10;
            }
            &3{
                background-color: #000000;
            }
        }
      }

      .date {
        font-size: 12px;
        color: #828282;
        line-height: 17px;
      }

      .new{
        margin-left: 8px;
        font-size: 12px;
        color:red;
      }

      .title {
        padding-top: 8px;
        padding-bottom: 16px;
        font-size: 14px;
        line-height: 20px;
        color: #353535;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
`;

export default NoticeHead;
