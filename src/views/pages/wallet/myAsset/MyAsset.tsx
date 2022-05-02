import React, { useEffect } from 'react';
import styled from 'styled-components';
import useService from '@/hooks/useService';
import MyAssetList from '@/views/components/wallet/myAsset/MyAssetList';
import { MOBILE_SIZE, TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const MyAsset = () => {
  const services = useService()
  const { myAssetData, getMyAsset } = services.wallet.getMyAsset();

  useEffect(() => {
    getMyAsset();
  }, []);

  return (
    <MyAssetStyle>
      <h4 className="sub-tit">My Asset</h4>
      <div className="asset-list">
        <div className="list-hd">
          <span>Coin</span>
          <span>Asset Value</span>
          <span>Total</span>
          <span>Action</span>
        </div>
        <div className="list-bd">
          {myAssetData.map(asset => (<MyAssetList key={`asset-${asset[1]}`} symbol={asset[1]} asset={asset[2]} />))}
        </div>
      </div>
    </MyAssetStyle>
  );
};

const MyAssetStyle = styled.div`

    .asset-list {
      margin: 40px 0;
      .list-hd {
        border-bottom: 1px solid rgba(154, 154, 154);
        > span {
          display: inline-block;
          width: 25%;
          padding: 0 0 10px;
          font-size: 14px;
          color: #000;
          line-height: 19px;
          font-weight: 500;
          text-align: center;
          &:first-child {
            text-align: left;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE}) {
      .asset-list {
        margin: 24px 0;
        .list-hd {
          display: none;
        }
      }
    
  
`;

export default MyAsset;
