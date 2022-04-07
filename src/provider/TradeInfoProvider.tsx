import React, { createContext, useState } from 'react';

interface PropsType {
  children: React.ReactNode;
}

const defaultValue = {
  marginType: '0',
  setMarginType: (value: '0' | '1'): void => {},
  leverage: 10,
  setLeverage: (value: number): void => {},
};

export const TradeInfoContext = createContext(defaultValue);

const TradeInfoProvider = ({ children }: PropsType) => {
  const [marginType, setMarginType] = useState<'0' | '1'>('1');
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
