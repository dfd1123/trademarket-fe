import React, { useState, useEffect, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
// https://github.com/wojtekmaj/react-calendar
import Calendar, { MonthView } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import KmfFooter from '../../components/common/kmf/KmfFooter';
import ContentSupportLink from '@/views/components/common/kmf/ContentSupportLink';

interface TileContentProps {
  dotColor: string;
}

const TileContent = ({ dotColor } :TileContentProps) => {
  return (
    <TileContentContainer>
      <Dot color={dotColor}></Dot>
      <Dot color={dotColor}></Dot>
      <Dot color={dotColor}></Dot>
    </TileContentContainer>
  )
}

function BusinessInfo() {
  const [date, setDate] = useState<Date>(new Date());
  const locale = 'ko-KR';
  const formatDate = (calendarLocale: string, date: Date) => {
    return moment(date).format('D').toString();
  };

  return (
    <Container>
      <Header>사업안내</Header>
      <CalendarWrapper
        locale={locale}
        calendarType="US"
        defaultView="month"
        maxDetail="month"
        view="month"
        value={date}
        formatDay={formatDate}
        onChange={() => console.log('date')}
        // 요기에 스타일링을 해서 가로로 들어가게 하면 됩니다. 일정이 없더라도 빈 공간을 만들거나 타일의 크기를 fix 할것.
        // tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ?
        tileContent={({ activeStartDate, date, view }) => view === 'month' && moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ?
          <>
            <TileContent dotColor={'red'} />
          </>
          :
          <>
            <TileContent dotColor={''} />
          </>
        }
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

const TileContentContainer = styled.div`
  width: 100%;
  height: 8px;
  display: flex;
  justify-content: center;
  margin-top: 6px;
`;

const Dot = styled.div<{color: string}>`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: ${props => props.color};
  padding: 1px;
  margin: 0 1px 0 1px;
`;

const Header = styled.header`
  text-align: center;
  height: 10%;
  width: 100%;
  font-size: 2rem;
  background-color: #1574BD ;
  color: white;
  padding: 20px 0;
`;

const CalendarWrapper = styled(Calendar)`
  width: 100%;
  border: none;
  .react-calendar__navigation {
    background-color: #1574BD;
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
        background-color: #1574BD;
      }
      &:active {
        background-color: #59bdff;
      }
    }
    .react-calendar__navigation__next-button {
      &:enabled {
        background-color: #1574BD;
      }
      &:active {
        background-color: #59bdff;
      }
      order: 2;
      margin-right: 6px;
    }
    .react-calendar__navigation__label {
      text-align: start;
      padding-left: 24px;
    }
  }
  .react-calendar__viewContainer {
    /* padding: 0 2px; */
  }
  & .react-calendar__tile {
    padding: 8px 6px ;
    /* background-color: white; */
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
  padding: 20px 20px;
  border-top: 2px solid #eeeeee;
`;

const SupportListWrapper = styled.ul`
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
