import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from '@/views/components/common/tab/Tab';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';

const WalletHistory = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <WalletHistoryStyle>
      <h4 className="sub-tit">Deposit and Withdraw History</h4>
      <Tab
        list={['Deposit', 'Withdraw']}
        ripple={false}
        onChange={setTabIndex}
      />
      <div className="history-table">
        <div className="list">
          <div className="hd">
            <div className="coin">
              <img src="/img/coin/ico-btc.svg" alt="btc" />
              <span>BTC</span>
            </div>
            <div className="date">2022.04.06 15:42:13</div>
          </div>
          <div className="bd">
            <div className="bd-box">
              <div className="sm-value-box">
                <span className="label">Status</span>
                <span className="value">Convert</span>
              </div>
              <div className="sm-value-box amount">
                <span className="label">Amount</span>
                <span className="value">0.01 BTC</span>
              </div>
            </div>
            <div className="bd-box">
              <div className="sm-value-box">
                <span className="label">Tx</span>
                <span className="value">1892739812739817293 87129837</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletHistoryStyle>
  );
};

const WalletHistoryStyle = styled.div`
  .history-table {
    .list {
      padding: 30px 10px;
      border-bottom: 1px solid rgb(231, 231, 231);
      border-radius: 4px;
      .hd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .coin {
          img {
            width: 32px;
            margin-right: 10px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
          }
        }

        .date {
          font-size: 14px;
          color: #777;
        }
      }

      .bd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .sm-value-box {
          display: inline-block;
          span {
            display: block;

            &.label {
              margin-bottom: 6px;
              font-size: 14px;
              color: #666;
              font-weight: bold;
            }

            &.value {
              font-size: 16px;
            }
          }

          &.amount {
            margin-left: 70px;
          }
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE}) {
    .history-table {
      .list {
        .hd {
          .coin {
            img {
              width: 26px;
              margin-right: 10px;
            }
          }
        }
        .bd {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          margin-top: 10px;
          .bd-box {
            width: 100%;
            margin-top: 20px;
            &:first-child {
              .sm-value-box {
                width: 50%;
                &.amount {
                  margin-left: 0;
                }
              }
            }
          }
          .sm-value-box {
            span {
              &.label {
                font-size: 13px;
              }

              &.value {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
`;

export default WalletHistory;
