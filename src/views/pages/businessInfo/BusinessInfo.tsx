import React, { useState } from 'react';
import styled from 'styled-components';
// https://github.com/wojtekmaj/react-calendar
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { dateFormat } from '@/utils/dateUtils';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfLinkedList from '@/views/components/common/listView/KmfLinkedList';
import TileContent from '@/views/components/businessInfo/TileContet';

function BusinessInfo() {
  const [date, setDate] = useState<Date>(new Date());
  const locale = 'ko-KR';
  const formatDate = (calendarLocale: string, date: Date) => {
    // return moment(date).format('D').toString();
    return dateFormat(date, 'd')
  };

  return (
    <ContainerStyle>
      {/* <Header>사업안내</Header> */}
      <KmfHeader headerText={"사업안내"} />
      <CalendarWrapperStyle
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
        tileContent={({ date, view }) => view === 'month' && dateFormat(date, 'yyyy-MM-dd') === dateFormat(new Date(), 'yyyy-MM-dd') ?
          <>
            <TileContent dotColor={'red'} />
          </>
          :
          <>
            <TileContent dotColor={''} />
          </>
        }
      />
      <CurrentMonthStyle>{dateFormat(date, 'yyyy.MM')}</CurrentMonthStyle>
      <SupportListWrapperStyle>
        <KmfListWrapper>
            <KmfLinkedList title='Pariatur Lorem anim esse velit dolore dolore occaecat velit voluptate velit sunt. Pariatur Lorem anim esse velit dolore dolore occaecat velit voluptate velit sunt.' to="/info" />
        </KmfListWrapper>
        <KmfListWrapper>
            <KmfLinkedList title='2월 콘텐츠창작 지원사업' to="/info" />
        </KmfListWrapper>
      </SupportListWrapperStyle>
      <KmfFooter />
    </ContainerStyle>
  );
}

const CalendarWrapperStyle = styled(Calendar)`
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

const ContainerStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CurrentMonthStyle = styled.div`
  width: 100%;
  height: 2rem;
  padding: 20px 20px;
  border-top: 2px solid #eeeeee;
`;

const SupportListWrapperStyle = styled.ul`
  overflow-y: auto;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 16px;
`;

export default BusinessInfo;