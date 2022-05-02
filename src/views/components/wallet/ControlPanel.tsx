import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import BasicButton from '../common/Button';
import SelectBox from '../common/input/SelectBox';
import IconCalendar from '@/assets/img/icon/ico-calendar.svg?component';
import {
  MOBILE_SIZE,
  SMALL_MOBILE_SIZE,
  TABLET_SIZE,
} from '@/assets/styles/responsiveBreakPoint';
import useModal from '@/hooks/useModal';
import ModalDatePicker from '../common/modal/ModalDatePicker';
import { dateFormat } from '@/utils/dateUtils';
import useService from '@/hooks/useService';
import { useLocation } from 'react-router';
import coinList from '@/data/coinList';
import { AssetData } from '@/services/types/Wallet';

interface PropsType {
  coin: string;
  date: string;
  dateRange: string[];
  onChangeDate: (date: string) => void;
  onChangeDateRange: (dateRange: string[]) => void;
  onChangeCoin: (symbol: string) => void;
}

const ControlPanel = ({
  coin,
  date,
  dateRange,
  onChangeCoin,
  onChangeDate,
  onChangeDateRange,
}: PropsType) => {
  const services = useService();
  const { pathname } = useLocation();
  const { openModal } = useModal();

  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [tempDate, setTempDate] = useState(date);
  const [tempDateRange, setTempDateRange] = useState<string[]>(dateRange);

  const { myAssetData, getMyAsset } = services.wallet.getMyAsset();
  const { unrealProfitNLoss, getUnrealProfitNLoss } =
    services.wallet.getUnrealProfitNLoss();

  const coinList = useMemo(() => {
    if (myAssetData.length > 0) 
      return myAssetData.map((data) => ({
        name: data[1].trim(),
        value: data[1].trim(),
      }));
  }, [myAssetData]);

  const openDatePickerModal = async () => {
    const result = await openModal(ModalDatePicker, {
      props: { initialDateRange: dateRange, range: true },
    });
    setTempDateRange(result);
  };

  const inquiry = () => {
    onChangeDate(tempDate);
    onChangeDateRange(tempDateRange);
  };

  useEffect(() => {
    const findAsset = myAssetData.find((asset) => asset[1].trim() === coin);
    if (findAsset) {
      setAssetData({
        symbol: findAsset[1].trim(),
        totalAmount: findAsset[2],
        assetValue: 0,
      });
    }
  }, [myAssetData]);

  useEffect(() => {
    getMyAsset();
  }, [coin]);

  useEffect(() => {
    getUnrealProfitNLoss();
  }, [pathname]);

  return (
    <ControlPanelStyle>
      <div className="tit">
        <div className="coin-select">
          <img src={`/img/coin/ico-${coin.toLowerCase()}.svg`} alt={coin} />
          <SelectBox
            name="curNo"
            list={coinList}
            value={coin}
            onChange={onChangeCoin}
          />
        </div>
        <b> WALLET</b>
      </div>
      <div className="control-box">
        <div className="panel-cont">
          <div className="panel-box">
            <span className="label">My Asset</span>
            <div className="value">
              {assetData?.totalAmount}
              <i>{coin}</i>
            </div>
          </div>
          <div className="panel-box">
            <span className="label">Unrealized Profit / Loss</span>
            <div className="value">
              {(unrealProfitNLoss[0] || []).length > 5
                ? unrealProfitNLoss[0][6]
                : 0.0}
              <i>USDT</i>
            </div>
          </div>
        </div>
        <div className="search-form-cont">
          <div className="date-range" onClick={openDatePickerModal}>
            <span className="label">DATE</span>
            <div className="value">
              <IconCalendar />
              {tempDateRange[0]} <i>~</i> {tempDateRange[1]}
            </div>
          </div>
          <BasicButton className="btn-inquiry" onClick={inquiry}>
            INQUIRY
          </BasicButton>
        </div>
      </div>
    </ControlPanelStyle>
  );
};

const ControlPanelStyle = styled.div`
  max-width: 1180px;
  margin: 70px auto 0;
  padding: 20px 20px;
  .tit {
    margin-bottom: 30px;

    .coin-select {
      display: inline-block;
      vertical-align: middle;
      margin-right: 20px;
      padding: 0px 0px 0 10px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      img {
        width: 32px;
      }
      ${SelectBox} {
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        font-weight: bold;
        background-color: transparent;
        border-color: transparent;
      }
    }

    > b {
      display: inline-block;
      vertical-align: middle;
      font-size: 34px;
      font-weight: bold;
      color: #fff;
      line-height: 46px;
      letter-spacing: -1px;
    }
  }

  .control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 40px;
    background-color: #415a72;
    border-radius: 4px;

    .panel-cont {
      .panel-box {
        display: inline-block;
        vertical-align: middle;
        margin-right: 80px;
        .label {
          display: block;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
          color: rgb(255, 171, 46);
        }
        .value {
          font-size: 24px;
          font-weight: bold;
          color: #fff;

          > i {
            padding-left: 8px;
            font-size: 16px;
            font-weight: normal;
          }
        }

        /* &:last-child {
          margin-right: 0;
        } */
      }
    }

    .search-form-cont {
      .date-range {
        display: inline-block;
        vertical-align: middle;
        margin-right: 20px;

        .label {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          color: #fff;
          font-weight: bold;
        }
        .value {
          padding: 18px 25px;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: pointer;

          svg {
            width: 16px;
            margin-right: 15px;
            margin-left: -10px;
            path {
              fill: #fff;
            }
          }

          > i {
            font-size: 18px;
            font-weight: normal;
            margin: 0 15px;
          }
        }
      }
      .btn-inquiry {
        display: inline-block;
        vertical-align: bottom;
        height: 56px;
        padding: 15px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    margin: 20px auto 0;

    .tit {
      margin-bottom: 20px;
      .coin-select {
        margin-right: 20px;
        padding: 0px 0px 0 10px;
        img {
          width: 25px;
        }
        ${SelectBox} {
          padding: 10px 30px 10px 10px;
          font-size: 17px;
        }
      }

      > b {
        font-size: 21px;
      }
    }

    .control-box {
      padding: 24px 40px;

      .panel-cont {
        .panel-box {
          margin-top: 15px;
          margin-bottom: 15px;
        }
      }

      .search-form-cont {
        .date-range {
          .value {
            svg {
              display: none;
            }

            > i {
              margin: 0 6px;
            }
          }
        }
        .btn-inquiry {
          margin-top: 10px;
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE}) {
    .control-box {
      padding: 20px 16px;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;

      .panel-cont {
        .panel-box {
          margin-top: 0;
          margin-right: 40px;
          .label {
            margin-bottom: 10px;
            font-size: 14px;
          }
          .value {
            font-size: 18px;
          }
        }
      }

      .search-form-cont {
        .date-range {
          .label {
            font-size: 10px;
          }
          .value {
            padding: 14px 16px;
            font-size: 16px;

            > i {
              margin: 0 7px;
              font-size: 15px;
            }
          }
        }
        .btn-inquiry {
          height: 46px;
          padding: 15px;
          font-size: 14px;
        }
      }
    }
  }

  @media (max-width: ${SMALL_MOBILE_SIZE}) {
    .control-box {
      .search-form-cont {
        width: 100%;
        .date-range {
          width: 100%;
          margin-right: 0;

          .value {
            text-align: center;
          }
        }
        .btn-inquiry {
          display: block;
          width: 100%;
          margin-top: 16px;
        }
      }
    }
  }
`;

export default ControlPanel;
