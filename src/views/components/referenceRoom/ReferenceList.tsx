import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import { dateFormat } from '@/utils/dateUtils';
import BasicButton from '@/views/components/common/Button';
import { Link } from 'react-router-dom';
import { RefrenceDataType } from '@/services/types/Reference';

interface PropsType {
  info : RefrenceDataType
}

const ReferenceList = ({ info }: PropsType) => {
  const unreadRefList = useTypedSelector(
    (state) => state.noticeSlice.unreadRefList
  );
  const unread = unreadRefList.includes(info.ar_id ?? -1);
  const date = dateFormat(new Date(info.created_at), 'yyyy - MM - dd');

  const fileDownload = () => {
    const file = JSON.parse(info.ar_file || '[]');
    if(file[0]){
      const fileArr = file[0].split('/');
      const filename = fileArr[fileArr.length - 1];

      const blob = new Blob([`${process.env.VITE_STORAGE_URL}${file[0]}`], {type: 'text/plain'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  }

  return (
    <Container>
      <Link to={`/ref/${info.ar_id}`}>
        <p className="title">{info.ar_title}</p>
        <span className="date">{date || '-'}</span>
        {unread ? <span className="new">new</span> : ''}
      </Link>
      <BasicButton
        className="button"
        ripple={false}
        onClick={fileDownload}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 14.5C3.55228 14.5 4 14.9477 4 15.5V19.5C4 19.7652 4.10536 20.0196 4.29289 20.2071C4.48043 20.3946 4.73478 20.5 5 20.5H19C19.2652 20.5 19.5196 20.3946 19.7071 20.2071C19.8946 20.0196 20 19.7652 20 19.5V15.5C20 14.9477 20.4477 14.5 21 14.5C21.5523 14.5 22 14.9477 22 15.5V19.5C22 20.2957 21.6839 21.0587 21.1213 21.6213C20.5587 22.1839 19.7957 22.5 19 22.5H5C4.20435 22.5 3.44129 22.1839 2.87868 21.6213C2.31607 21.0587 2 20.2956 2 19.5V15.5C2 14.9477 2.44772 14.5 3 14.5Z"
            fill="#D2D2D2"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.29289 9.79289C6.68342 9.40237 7.31658 9.40237 7.70711 9.79289L12 14.0858L16.2929 9.79289C16.6834 9.40237 17.3166 9.40237 17.7071 9.79289C18.0976 10.1834 18.0976 10.8166 17.7071 11.2071L12.7071 16.2071C12.3166 16.5976 11.6834 16.5976 11.2929 16.2071L6.29289 11.2071C5.90237 10.8166 5.90237 10.1834 6.29289 9.79289Z"
            fill="#D2D2D2"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.5C12.5523 2.5 13 2.94772 13 3.5V15.5C13 16.0523 12.5523 16.5 12 16.5C11.4477 16.5 11 16.0523 11 15.5V3.5C11 2.94772 11.4477 2.5 12 2.5Z"
            fill="#D2D2D2"
          />
        </svg>
      </BasicButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 16px;
  height: 100%;

  .date {
    color: #828282;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .new {
    margin-left: 8px;
    font-size: 12px;
    color: red;
  }

  .title {
    font-size: 14px;
    font-weight: 400;
    width: 80%;
    line-height: 1.4rem;
    display: -webkit-box !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 2 !important;
    font-size: 14px;
  }

  ${BasicButton} {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    border: none;
    margin: 0;
    text-align: start;
  }
`;

export default ReferenceList;
