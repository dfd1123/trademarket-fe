import React, { useEffect, useState } from 'react';
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
import useService from '@/hooks/useService';
import { forEach } from 'lodash';

function BusinessInfo() {
  const [date, setDate] = useState<Date>(new Date());
  const locale = 'ko-KR';
  const service = useService();
  const [businesses, setBusinesses] = useState<any>();
  const [dates, setDates] = useState<string[]>([]);
  const formatDate = (calendarLocale: string, date: Date) => {
    return dateFormat(date, 'd');
  };
  const getBusinessData = async () => {
    const { notices, notices_count } =
      await service.business.getBusinessInfoList(30, 0);
    setBusinesses(notices);
    const dateArr = notices.map((item) => item.no_date_start);
    setDates(dateArr);
    console.log(dateArr);
    console.log(notices);
  };

  useEffect(() => {
    getBusinessData();
  }, []);

  return (
    <ContainerStyle>
      {/* <Header>사업안내</Header> */}
      <KmfHeader headerText={'사업안내'} />
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
        tileContent={({ date, view }) => {
          return dates.includes(dateFormat(date, 'yyyy-MM-dd')) ? (
            <TileContent />
          ) : null;
        }}
        // tileContent={({ date, view }) =>
        //   view === 'month' &&
        //   dateFormat(date, 'yyyy-MM-dd') ===
        //     dateFormat(new Date(), 'yyyy-MM-dd') ? (
        //     <>
        //       <TileContent dotColor={'red'} />
        //     </>
        //   ) : (
        //     <>
        //       <TileContent dotColor={''} />
        //     </>
        //   )
        // }
      />
      <CurrentMonthStyle>{dateFormat(date, 'yyyy.MM')}</CurrentMonthStyle>
      <SupportListWrapperStyle>
        {businesses &&
          businesses.map((item, index) => {
            return (
              <KmfListWrapper key={item.no_id}>
                <KmfLinkedList
                  title={item.no_title}
                  to={`/info/${item.no_id}`}
                />
              </KmfListWrapper>
            );
          })}
      </SupportListWrapperStyle>
      <KmfFooter />
    </ContainerStyle>
  );
}

const CalendarWrapperStyle = styled(Calendar)`
  width: 100%;
  border: none;
  .react-calendar__navigation {
    background-color: #1574bd;
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
        background-color: #1574bd;
      }
      &:active {
        background-color: #59bdff;
      }
    }
    .react-calendar__navigation__next-button {
      &:enabled {
        background-color: #1574bd;
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
    padding: 8px 6px;
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
