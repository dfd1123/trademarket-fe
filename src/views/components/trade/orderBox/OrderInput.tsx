import { useState } from 'react';
import styled from 'styled-components';
import { BasicInput } from '@/views/components/common/input/TextInput';
import IntegerInput from '@/views/components/common/input/IntegerInput';
import { formatNumber } from '@/utils/numberUtils';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {
  className?: string;
  label: string;
  name: string;
  value?: string | number;
  decimalCnt?: number;
  onChange?: (value: any, name?: string) => void;
}

const OrderInputComp = ({
  className,
  name,
  label,
  value,
  decimalCnt = 2,
  onChange,
}: PropsType) => {
  const priceStepsFourTwo = [100, 1000, 10000, 100000, 1000000];
  const priceStepsForFour = [0.0001, 0.001, 0.01, 0.1, 1];
  const priceSteps = decimalCnt > 2 ? priceStepsForFour : priceStepsFourTwo;
  const amountSteps = [1, 5, 10, 15, 20];

  const [step, setStep] = useState(
    name === 'price' ? priceSteps[0] : amountSteps[0]
  );

  return (
    <div className={`${className} inp-box`}>
      <label className="label">{label}</label>
      <div className="inp">
        <IntegerInput
          name={name}
          value={value}
          step={step}
          dec={decimalCnt}
          placeholder="0"
          onChange={onChange}
        />
        <div className="option">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
          <ul className="drop-box">
            {name === 'price'
              ? priceSteps.map((price) => (
                  <li
                    key={price}
                    className={`${price === step && 'active'}`}
                    onClick={() => setStep(price)}
                  >
                    {formatNumber(price)}
                  </li>
                ))
              : amountSteps.map((amount) => (
                  <li
                    key={amount}
                    className={`${amount === step && 'active'}`}
                    onClick={() => setStep(amount)}
                  >
                    {formatNumber(amount)}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const OrderInput = styled(OrderInputComp)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label {
    font-size: 12px;
    color: #fff;
  }

  .inp {
    max-width: 200px;
    width: 100%;
    ${IntegerInput} {
      width: calc(100% - 20px);
      display: inline-block;
      input {
        width: 100%;
        outline: none;
        height: 30px;
        padding: 5px;
        font-size: 12px;
        color: #ffffff;
        background-color: #33353b;
        border: 2px solid #33353b;
      }
    }
    .option {
      position: relative;
      display: inline-block;
      width: 20px;
      svg {
        vertical-align: middle;
        cursor: pointer;
        path {
          fill: #fff;
        }
      }

      .drop-box {
        display: none;
        position: absolute;
        top: -20px;
        right: 0;
        top: 0;
        z-index: 3;
        border-radius: 6px;
        border: 1px solid #33353b;
        background-color: #1e1f23;

        > li {
          padding: 6px 12px;
          font-size: 12px;
          color: #ffffff;
          background-color: #1e1f23;
          cursor: pointer;
          &:hover,
          &.active {
            background-color: #33353b;
          }
        }
      }

      &:hover {
        .drop-box {
          display: block;
        }
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    flex-direction: column;
    align-items: flex-start;

    .label {
      margin-bottom: 6px;
    }
    .inp {
      max-width: 100%;
      width: 100%;
      >div{
        height: 40px;
      }
      ${IntegerInput} {
        input{
          height: 40px;
        }
      }
    }
  }
`;

export default OrderInput;
