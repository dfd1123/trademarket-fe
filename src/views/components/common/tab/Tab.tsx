import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NoBorderButton } from '@/views/components/common/Button';

interface PropsType {
  list: string[];
  selected?: number;
  ripple?: boolean;
  className?: string;
  onChange?: (value: number, name?: string) => void;
  onClick?: () => void;
}

const Tab = ({
  list,
  selected,
  ripple = true,
  className,
  onChange,
  onClick,
}: PropsType) => {
  const [state, setState] = useState(0);

  const changeIndex = (idx: number) => {
    setState(idx);
    onChange && onChange(idx);
  };

  const clickChangeIndex = (idx: number) => {
    changeIndex(idx);
    onClick && onClick();
  }

  useEffect(() => {
    if (selected !== undefined) changeIndex(selected);
  }, [selected]);

  return (
    <div className={className}>
      {list.map((item, index) => (
        <NoBorderButton
          key={index}
          ripple={ripple}
          className={`${state === index ? 'active' : ''}`}
          onClick={() => clickChangeIndex(index)}
        >
          {item}
        </NoBorderButton>
      ))}
    </div>
  );
};

const TabStyle = styled(Tab)`
  ${NoBorderButton} {
    &.active {
      background-color: #ddd;
    }
  }
`;

export const YellowTabStyle = styled(TabStyle)`
  display: inline-flex;
  white-space: nowrap;
  font-weight: 700;
  background-color: #33353b;
  ${NoBorderButton} {
    width: 100%;
    color: rgba(255, 255, 255, 0.6);
    border-radius: 0;
    &.active {
      color: #ffab2e;
      background-color: transparent;

      &:after{
        background-color: #ffab2e;
      }
    }
    &:after{
      position:absolute;
      bottom:0;
      left:0;
      right:0;
      z-index: 1;
      content:'';
      display: block;
      width:100%;
      height: 2px;
      background-color: transparent;
    }
  }
`;

export default TabStyle;
