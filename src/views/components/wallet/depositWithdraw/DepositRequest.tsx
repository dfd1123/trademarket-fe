import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router";
import QRCode from "react-qr-code";
import useService from "@/hooks/useService";
import { WalletOutletContext } from "@/views/pages/wallet/Wallet";
import TextInput from "@/views/components/common/input/TextInput";
import { YellowBorderButton } from "@/views/components/common/Button";

const DepositRequest = () => {
  const services = useService();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  const { walletInfo, getCoinWalletInfo } =
    services.wallet.getCoinWalletInfo(coin);

  const walletAddress = useMemo(
    () => walletInfo?.szWallet_Addr || "",
    [walletInfo]
  );

  useEffect(() => {
    getCoinWalletInfo(coin);
  }, [coin]);

  return (
    <DepositRequestStyle>
      <div className="box">
        <div className="inp-cont">
          <span className="label">My {coin} Wallet Address</span>
          <div className="btn-with-inp">
            <TextInput name="address" value={walletAddress} />
            <YellowBorderButton>Copy Address</YellowBorderButton>
          </div>
        </div>
        <div className="inp-cont">
          <span className="label">Destination Tag</span>
          <TextInput name="reqAmount" disabled />
        </div>
      </div>
      <div className="box">
        <span className="label">QR Code</span>
        <div className="qr-info-cont">
          <div className="qr-cont">
            <QRCode value={walletAddress} size={230} />
          </div>
          <div className="exchange-info">
            <b>Please note when depositing. Please check below!</b>
            <p>
              The deposit from the outside wallet to your DAOBIT Wallet will
              take place after one confirmation.
              <br />
              It may take about 10 to 30 minutes.
              <br />
              Please make sure that you verify your transfer address.
              <br />
              <br />
              <br />
              Withdrawals are possible twice a day.
              <br />
              Withdrawals are processed sequentially at 6am and 2pm.
              <br />
              <br />
              <br />
              DAOBIT is not responsible for any loss caused by mistranslation
              for the address.
            </p>
          </div>
        </div>
      </div>
      <div className="box">
      <span className="label">Deposit History</span>
      </div>
    </DepositRequestStyle>
  );
};

const DepositRequestStyle = styled.div`
  .btn-with-inp {
    display: flex;
    column-gap: 10px;
  }

  ${TextInput} {
    width: 100%;
  }

  ${YellowBorderButton} {
    width: 130px;
    height: 46px;
    font-size: 12px;
    border-radius: 4px;
    background-color: transparent;
  }

  .box {
    padding: 20px 0;
    border-top:1px solid rgb(225, 225, 225);
    &:first-child{
      border-top: none;
    }
    > .label {
      display: block;
      margin-top: 10px;
      margin-bottom: 15px;
      font-size: 15px;
      font-weight: bold;
      line-height: 20px;
    }
    .inp-cont {
      max-width: 440px;
    }
    .qr-info-cont {
      display:flex;
      flex-wrap: wrap;
      column-gap: 15px;
      .qr-cont {
        width: 270px;
        padding: 20px;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 4px;
      }
      .exchange-info {
        display: inline-block;
        min-width: 270px;
        margin: 10px 0;
        padding: 20px;
        background-color: rgba(255, 107, 107, 0.04);
        border-radius: 4px;
        > b {
          display: block;
          margin-bottom: 20px;
          font-size: 13px;
          line-height: 18px;
          color: rgb(255, 107, 107);
          font-weight: 600;
        }
        > p {
          font-size: 11px;
          line-height: 15px;
          color: rgb(119, 119, 119);
        }
      }
    }
  }
`;

export default DepositRequest;
