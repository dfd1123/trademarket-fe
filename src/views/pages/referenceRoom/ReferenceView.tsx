import useService from '@/hooks/useService';
import { NoticeInfo } from '@/services/types/Notice';
import FooterButton from '@/views/components/common/FooterButton';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import NoticeHead from '@/views/components/notice/NoticeHead';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

const ReferenceView = () => {
  const navigate = useNavigate();
  const services = useService();
  let { ar_id } = useParams();
  const [info, setInfo] = useState<NoticeInfo | null>(null);

  const getReference = async () => {
    if (!ar_id || info) return;
    const result = await services.reference.getReferenceDetail({ ar_id });

    setInfo(result.archive);
  };

  useEffect(() => {
    getReference();
  }, []);

  return info ? (
    <ReferenceViewStyle>
      <KmfHeader headerText="" prev />
      <div className="notice-cont">
        <NoticeHead
          type={info.no_type}
          date={info.created_at}
          title={info.ar_title}
        />
        <div className="body">
          <div
            className="contents"
            dangerouslySetInnerHTML={{
              __html: info.ar_content.replace('\n', '<br />'),
            }}></div>
          <span>KMF 화이팅!</span>
        </div>
      </div>
      <FooterButton shared onClick={() => navigate(-1)}>
        목록으로
      </FooterButton>
    </ReferenceViewStyle>
  ) : (
    <></>
  );
};

const ReferenceViewStyle = styled.div`
  .notice-cont {
    padding: 16px;

    .hd {
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
      }

      .date {
        font-size: 12px;
        color: #828282;
        line-height: 17px;
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
    }

    .body {
      padding-top: 16px;
      border-top: 1px solid #f1f1f1;
      .contents {
        min-height: 100px;
        padding: 8px;
        background: #f9f9f9;
        border-radius: 5px;
        font-size: 12px;
        line-height: 15px;

        a {
          font-size: 12px;
          color: #1574bd;
          text-decoration: underline;
        }
      }

      > span {
        display: block;
        margin-top: 32px;
        font-size: 12px;
        line-height: 17px;
        text-align: center;
        color: #bfbfbf;
      }
    }
  }
`;

export default ReferenceView;
