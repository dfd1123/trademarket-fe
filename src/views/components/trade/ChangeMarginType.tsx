import { useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { TradeInfoContext } from '@/provider/TradeInfoProvider';
import { ButtonCheckBox } from '@/views/components/common/input/CheckBox';
import { YellowButton } from '@/views/components/common/Button';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useModal from '@/hooks/useModal';
import LeverageSetModal from '@/views/components/trade/modal/LeverageSetModal';

const ChangeMarginType = () => {
  const context = useContext(TradeInfoContext);
  const { marginType, setMarginType, leverage, setLeverage } = context;
  const {symbol} = useParams();
  const {openModal} = useModal();

  const openLeverage = async () => {
    const newLeverage = await openModal(LeverageSetModal, {props:{leverage, symbol}});
    setLeverage(newLeverage);
  }



  return (
    <ChangeMarginTypeStyle>
      <ButtonCheckBox
        type="radio"
        name="margin-type"
        label="CROSS"
        value="0"
        data={marginType}
        onChange={setMarginType}
      />
      <ButtonCheckBox
        type="radio"
        name="margin-type"
        label="ISO"
        value="1"
        data={marginType}
        onChange={setMarginType}
      />
      <YellowButton onClick={openLeverage}>leverage</YellowButton>
      <span className="levarage">
        levarage
        <em>x {leverage}</em>
      </span>
    </ChangeMarginTypeStyle>
  );
};

const ChangeMarginTypeStyle = styled.div`
  display: inline-block;
  margin-left: 20px;

  > div {
    display: inline-block;
    vertical-align: middle;
  }

  ${ButtonCheckBox} {
    label {
      width: 70px;
      height: 30px;
      margin: 0 5px;
      padding: 0;
      font-size: 13px;
      font-weight: 700;
      color: #fff !important;
      line-height: 30px;
      background-color: #33353b;
      border-radius: 3px;
    }

    input {
      &:checked {
        ~ label {
          color:#fff;
          background-color: #ffab2e;
        }
      }
    }
  }

  ${YellowButton} {
    width: 70px;
    height: 30px;
    margin: 0 5px;
    padding: 0;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    border-radius: 3px;
  }

  .levarage{
      display:inline-block;
      vertical-align: middle;
      margin-left:10px;
      font-size:11px;
      color:#fff;
      em{
          display:block;
          margin-top:3px;
          font-size:13px;
          color:red;
      }
  }

  @media (max-width: ${TABLET_SIZE}) {
    margin-top: 10px;
    margin-left: 0;

    ${ButtonCheckBox} {
      label {
        width: 60px;
        height: 28px;
        margin: 0 5px;
        padding: 0;
        font-size: 12px;
      }
    }

    ${YellowButton} {
      width: 60px;
      height: 28px;
      margin: 0 5px;
      padding: 0;
      font-size: 12px;
    }
  }
`;

export default ChangeMarginType;
