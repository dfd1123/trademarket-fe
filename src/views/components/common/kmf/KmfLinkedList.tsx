import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


interface KmfLinkedListProps {
  date?: Date;
  title: string;
  type: string;
  to?: string;
}

const KmfLinkedList = ({ title, date, type = 'none', to }: KmfLinkedListProps) => {

  return (
    <Container>
      <Link to={to}>
        <div>{date}</div>
        <Title>{ title}</Title>
      </Link>
    </Container>
  );
};

export default KmfLinkedList

const Container = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  width: 80%;
  /* border: 1px solid black; */
  line-height: 1.4rem;
  display: -webkit-box !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important

`;