import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useService from '@/hooks/useService';
import { useTypedSelector } from '@/store';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/utils/numberUtils';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import React from 'react';
import { TradeHistoryData } from '@/services/types/Trade';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PropsType {
  coinInfo: CoinInfo;
}

const SmallGraph = ({ coinInfo }: PropsType) => {
  const services = useService();
  const { tradeHistoryArr }: { tradeHistoryArr: TradeHistoryData[] } =
    services.trade.getTradeHistory(coinInfo.CUR_NO, 1, 3, 300);
  const [changePerc, setChangePerc] = useState('0.00');
  const [price, setPrice] = useState('0');
  const realTimeCoinInfo = useTypedSelector(
    (state) => state.realTimeData.price[coinInfo.CUR_NO]);

  useEffect(() => {
    if (realTimeCoinInfo) {
      const { szPreClose, szClose } = realTimeCoinInfo;
      if (Number(szPreClose) === 0) setChangePerc('0.00');
      else {
        setChangePerc(
          (
            ((Number(szClose) - Number(szPreClose)) / Number(szPreClose)) *
            100
          ).toFixed(2)
        );
      }

      setPrice(formatNumber(szClose, coinInfo.PIP_LOWEST));
    }
  }, [realTimeCoinInfo]);

  const data = {
    labels: tradeHistoryArr.map((trade) => trade.close),
    datasets: [
      {
        label: coinInfo.CUR_NO,
        borderColor:
          Number(changePerc) < 0 ? 'rgb(86, 180, 192)' : 'rgb(255, 107, 107)',
        backgroundColor:
          Number(changePerc) < 0
            ? 'rgba(86, 180, 192, 0.5)'
            : 'rgba(255, 107, 107, 0.5)',
        fill: true,
        data: tradeHistoryArr.map((trade) => trade.close),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        min:
          Math.min.apply(
            Math,
            tradeHistoryArr.map((trade) => trade.close)
          ) / 1.2,
        max:
          Math.max.apply(
            Math,
            tradeHistoryArr.map((trade) => trade.close)
          ) * 1.1,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 0,
        hoverRadius: 0,
      },
    },
  };

  return (
    <SmallGraphStyle className={Number(changePerc) < 0 ? 'down' : 'up'}>
      <div className="coin-info">
        <div className="info">
          <span className="name">{coinInfo.CUR_NO}</span>
          <span className="percent">{changePerc}%</span>
        </div>
        <b className="price">${price}</b>
      </div>
      <div className="graph-cont">
        {tradeHistoryArr.length ? (
          <Line options={options} data={data} height={100} />
        ) : (
          ''
        )}
      </div>
    </SmallGraphStyle>
  );
};

const SmallGraphStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: 190px;
  box-shadow: rgb(86 75 162 / 40%) 0px 6px 26px;
  border-radius: 10px;
  background: rgb(255, 255, 255);

  .coin-info {
    padding: 22px 18px 10px;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
      .name {
        font-size: 16px;
        line-height: 18px;
        font-weight: 700;
        color: rgb(53, 53, 53);
      }

      .percent {
        min-width: 60px;
        padding: 4px 5px;
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        text-align: center;
        color: rgb(255, 255, 255);
        background-color: rgb(255, 107, 107);
        border-radius: 4px;
      }
    }
    .price {
      font-size: 30px;
      font-weight: 700;
      line-height: 34px;
      color: rgb(255, 107, 107);
    }
  }

  .graph-cont {
    overflow: hidden;
    height: 120px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  canvas {
    display: block;
    box-sizing: border-box;
    transform: translateY(8px) scale(1.03);
  }

  &.down {
    .coin-info {
      .info {
        .percent {
          background-color: rgb(86, 180, 192);
        }
      }
      .price {
        color: rgb(86, 180, 192);
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    width: 180px;
    height: 120px;
    border-radius: 6px;

    .coin-info {
      padding: 10px;
      .info {
        margin-bottom: 0;
        .name {
          font-size: 14px;
          line-height: 18px;
        }
        .percent {
          min-width: 50px;
          padding: 4px 5px;
          font-size: 11px;
          line-height: 14px;
        }
      }
      .price {
        font-size: 19px;
        line-height: 25px;
      }
    }

    .graph-cont {
      height: 74px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

export default SmallGraph;
