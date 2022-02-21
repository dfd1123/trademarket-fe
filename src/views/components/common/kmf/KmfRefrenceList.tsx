import BasicButton from '@/views/components/common/Button';
import React from 'react';
import styled from 'styled-components';

interface PropsType {
  title: string;
  date?: string;
}

const KmfRefrenceList = ({ title, date }: PropsType) => {
  return (
    <Container>
      <BasicButton
        className="button"
        ripple={false}
        onClick={() => console.log('click')}>
        {date && <div className="date">{date}</div>}
        <p className="title">{title}</p>
      </BasicButton>
    </Container>
  );
};

export default KmfRefrenceList;

const Container = styled.div`
  width: 100%;
  padding: 10px 0;
  height: 100%;

  .date {
    color: #828282;
    font-size: 12px;
    margin-bottom: 12px;
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
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    text-align: start;
  }
`;
