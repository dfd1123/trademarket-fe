import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';
import BasicButton from '@/views/components/common/Button';
import { useTypedSelector } from '@/store';

interface PropsType {
    symbol: string;
}

const MyAssetList = ({symbol} : PropsType) => {
    const assetData = useTypedSelector(state => state.asyncData[`t9732_${symbol.toUpperCase()}USDT`].Output1);

    return (
        <MyAssetListStyle>

          <div className="name">
            <img src="/img/coin/ico-btc.svg" alt="btc" />
            <span>{symbol}</span>
          </div>
          <div className="value-info">
            <div className="asset">
              <i>Asset Value</i>4458.74
            </div>
            <div className="total">
              <i>Total</i>0.11607
            </div>
          </div>

          <div className="action">
            <BasicButton className="btn-deposit">Deposit</BasicButton>
            <BasicButton className="btn-withdraw">Withdraw</BasicButton>
          </div>
        </MyAssetListStyle>
    );
}

const MyAssetListStyle = styled.div`

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgb(231, 231, 231);
        .name {
          width: 25%;
          img {
            width: 32px;
            margin-right: 10px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 18px;
          }
        }
        .value-info {
          width: 50%;
          > div {
            display: inline-block;
            width: 50%;
            color: rgb(125, 125, 125);
            text-align: center;
          }
          i {
            display: none;
          }
        }

        .action {
          width: 25%;
          text-align: right;

          ${BasicButton} {
            width: 100px;
            height: 34px;
            margin: 5px 0;
            font-size: 14px;
            font-weight: bold;
            border: 1px solid rgb(23, 57, 89);
            border-radius: 4px;

            &.btn-deposit {
              color: #fff;
              background-color: rgb(23, 57, 89);
            }

            &.btn-withdraw {
              margin-left: 10px;
              color: rgb(23, 57, 89);
            }
          }
        }
        @media (max-width: ${MOBILE_SIZE}) {

        .coin-li {
          display: block;
          margin-bottom: 12px;
          padding: 12px;
          border: 1px solid rgb(231, 231, 231);
          border-radius: 4px;
          > * {
            width: auto !important;
            &.name {
              img {
                width: 24px;
              }
              span {
                font-size: 16px;
                font-weight: bold;
              }
            }
            &.value-info {
              margin: 20px 0;
              text-align: left;
              > div {
                width: auto;
                margin-right: 40px;
                text-align: left;

                &:last-child {
                  margin-right: 0;
                }
              }

              i {
                display: block;
                margin-bottom: 6px;
                font-size: 12px;
                font-weight: bold;
                color: #222;
              }
            }
            &.action {
              ${BasicButton} {
                width: auto;
                padding: 0 10px;
              }
            }
          }
        }
      }
`;


export default MyAssetList;
