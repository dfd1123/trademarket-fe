import React, { createContext, useState } from 'react';

interface PropsType {
  children: React.ReactNode;
}

const defaultValue = {
  marginType: 'cross',
  setMarginType: (value: 'cross' | 'iso'): void => {},
  leverage: 10,
  setLeverage: (value: number): void => {},
};

export const TradeInfoContext = createContext(defaultValue);

const TradeInfoProvider = ({ children }: PropsType) => {
  const [marginType, setMarginType] = useState<'cross' | 'iso'>('cross');
  const [leverage, setLeverage] = useState(10);

  return (
    <TradeInfoContext.Provider
      value={{
        marginType,
        setMarginType,
        leverage,
        setLeverage
      }}
    >
      {children}
    </TradeInfoContext.Provider>
  );
};

export default TradeInfoProvider;
