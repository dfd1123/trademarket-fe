import React, { useState, useEffect, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Calendar, { MonthView } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import KmfFooter from '../../components/common/kmf/KmfFooter';
import ContentSupportLink from '@/views/components/common/kmf/ContentSupportLink';

function BusinessInfo() {
  const [date, setDate] = useState('');
  const locale = 'ko-KR';

  return (
    <Container>
      <Header>사업안내</Header>
      <CalendarWrapper
        locale={locale}
        calendarType="US"
        defaultView="month"
        maxDetail="month"
        view="month"
        // defaultValue={moment()}
        value={new Date()}
        onChange={() => console.log('date')}
      />
      <CurrentMonth>{moment().format('YYYY.MM')}</CurrentMonth>
      <SupportListWrapper>
        <ContentSupportLink />
        <ContentSupportLink />
        <ContentSupportLink />
      </SupportListWrapper>
      <KmfFooter />
    </Container>
  );
}

export default BusinessInfo;

const Header = styled.header`
  text-align: center;
  height: 10%;
  width: 100%;
  font-size: 2rem;
  background-color: #18a0fb;
  color: white;
  padding: 20px 0;
`;

const CalendarWrapper = styled(Calendar)`
  width: 100%;
  border: none;
  .react-calendar__navigation {
    background-color: #18a0fb;
    & > * {
      color: white;
    }
    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation__prev-button {
      order: 1;
      &:enabled {
        background-color: #18a0fb;
      }
      &:active {
        background-color: #59bdff;
      }
    }
    .react-calendar__navigation__next-button {
      &:enabled {
        background-color: #18a0fb;
      }
      &:active {
        background-color: #59bdff;
      }
      order: 2;
    }
    .react-calendar__navigation__label {
      text-align: start;
      padding-left: 24px;
    }
  }
  .react-calendar__viewContainer {
    padding: 0 12px;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CurrentMonth = styled.div`
  width: 100%;
  height: 2rem;
  padding: 20px 24px;
  border-top: 2px solid #eeeeee;
`;

const SupportListWrapper = styled.ul`
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
