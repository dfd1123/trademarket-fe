import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import { ModalStyle } from '@/views/components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import { BasicInput } from '@/views/components/common/input/TextInput';
import { ButtonCheckBox } from '@/views/components/common/input/CheckBox';
import { YellowButton, BasicButton } from '@/views/components/common/Button';
import RangeInput from '@/views/components/common/input/RangeInput';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType extends ModalComponentPropsType {
  leverage?: number;
  symbol?: string;
}

const LeverageSetModal = ({
  leverage,
  symbol,
  nonModal,
  close,
  resolve,
}: PropsType) => {
  const min = 0;
  const radioCheckList = [1, 5, 10, 25, 50, 75, 100];
  const [newLeverage, setNewLeverage] = useState(min);
  const { MAX_LEVERAGE } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[symbol as string]
  );

  const [max, setMax] = useState(100);

  const submitLeverage = () => {
    resolve && resolve(newLeverage);
  };

  useEffect(() => {
    if(MAX_LEVERAGE) setMax(Number(MAX_LEVERAGE));
  }, [MAX_LEVERAGE]);

  useEffect(() => {
    if(!leverage) leverage = 0;
    setNewLeverage(leverage);
  }, [])

  return (
    <LeverageSetModalStyle close={close} nonModal={nonModal}>
      <h2 className="tit">Leverage</h2>
      <div className="inp-box">
        <BasicInput
          value={newLeverage}
          min={min}
          max={max}
          number
          onChange={setNewLeverage}
          onEnter={submitLeverage}
        />
      </div>
      <div>
        <RangeInput
          name="leverage-range"
          step={1}
          min={min}
          max={max}
          value={newLeverage}
          trackHeight={4}
          trackColor="#A1A1A1"
          thumbWidth={20}
          thumbHeight={20}
          thumbColor="#fff"
          showLabel
          onChange={setNewLeverage}
        />
      </div>
      <div className="radio-btn-cont">
        {radioCheckList.map((radio) => (
          <ButtonCheckBox
            key={radio}
            type="radio"
            name="leverage"
            label={`x ${radio}`}
            value={radio}
            data={newLeverage}
            disabled={radio > max}
            onChange={setNewLeverage}
          />
        ))}
      </div>
      <div className="info">Please manage your risk accordingly</div>
      <div className="btn-cont">
        <YellowButton onClick={submitLeverage}>Apply</YellowButton>
        <BasicButton onClick={close}>Cancel</BasicButton>
      </div>
    </LeverageSetModalStyle>
  );
};

const LeverageSetModalStyle = styled(ModalStyle)`
  .cont {
    padding: 25px;
    background-color: #1e1f23;
    border: 1px solid #33353b;
    border-radius: 5px;

    .tit {
      margin-bottom: 10px;
      font-size: 18px;
      color: #fff;
      text-align: center;
    }

    .inp-box {
      margin: 20px auto;
      text-align: center;
      ${BasicInput} {
        input {
          font-size: 13px;
          color: #fff;
          text-align: center;
          background-color: transparent;
          border: 1px solid #a1a1a1;
          border-radius: 5px;
        }
      }
    }

    .radio-btn-cont {
      ${ButtonCheckBox} {
        label {
          width: 70px;
          margin: 5px;
          padding: 0 0;
          font-size: 13px;
          color: #ffffff;
          line-height: 35px;
          text-align: center;
          cursor: pointer;
          border: 1px solid #33353b;
          border-radius: 5px;
          background-color: #33353b;
        }

        input {
          &:checked {
            ~ label {
              border: 1px solid #ffab2e;
            }
          }
          &:disabled{
            ~ label {
              opacity: 0.3;
            }
          }
        }
      }
    }

    .info {
      margin: 23px 0;
      font-size: 13px;
      color: #ffffff;
      text-align: center;
    }

    .btn-cont {
      text-align: center;
      ${YellowButton} {
        max-width: 100px;
        width: 100%;
        height: 40px;
        margin-right: 10px;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        text-align: center;
      }

      ${BasicButton} {
        max-width: 100px;
        width: 100%;
        height: 40px;
        margin-right: 10px;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        text-align: center;
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE}) {
    .cont {
      margin: 0 10px;

      .radio-btn-cont {
      ${ButtonCheckBox} {
          width:calc(100% / 4);
        label {
            width:100%;
        }
      }
    }
    }
  }
`;

export default LeverageSetModal;
