import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useCoinList from '@/hooks/useCoinList';
import BasicButton from '@/views/components/common/Button';
import OutsideClickHandler from '@/views/components/common/OutSideClickHandler';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const SelectCoinBox = () => {
  const [openDrop, setOpenDrop] = useState(false);
  const { symbols } = useCoinList();
  const navigate = useNavigate();
  const { symbol: selectedSymbol } = useParams();

  const toggleOpen = useCallback(() => {
    setOpenDrop(!openDrop);
  }, [openDrop]);

  const selectCoin = (symbolw: string) => {
    navigate(`/trade/${symbolw}`);
  };

  return (
    <SelectCoinBoxStyle>
      <OutsideClickHandler onOutsideClick={() => setOpenDrop(false)}>
        <BasicButton
          className={`selected-name ${openDrop && 'open'}`}
          ripple={false}
          onClick={toggleOpen}
        >
          {selectedSymbol}
        </BasicButton>
      </OutsideClickHandler>
      {openDrop && (
        <ul className="list-cont">
          {symbols.map((symbol) => (
            <li key={symbol} onClick={() => selectCoin(symbol)}>
              {symbol}
            </li>
          ))}
        </ul>
      )}
    </SelectCoinBoxStyle>
  );
};

const SelectCoinBoxStyle = styled.div`
  position: relative;
  display: inline-block;
  ${BasicButton} {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    margin: 0 10px;
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 0;

    &::after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid rgb(166, 166, 168);
      transform: rotate(0deg);
      transition: transform 0.2s;
    }

    &.open {
      &::after {
        transform: rotate(-180deg) translateY(1px);
      }
    }
  }

  .list-cont {
    overflow-y: scroll;
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 1;
    max-height: 500px;
    width: 200px;
    padding: 10px 0;
    border: 1px solid #33353b;
    border-radius: 4px;
    background-color: #1e1f23;

    > li {
      width: 100%;
      padding: 5px 15px;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      line-height: 37.65px;
      cursor: pointer;

      &:hover {
        background-color: #33353b;
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    ${BasicButton} {
      margin: 0 5px;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export default SelectCoinBox;
