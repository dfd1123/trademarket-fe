import React, { createContext, useState } from 'react';

export type OrderType = '' | 'UOM' | 'UOE' | 'UCEL' | 'UCES' | 'UCM' | 'URE';

export type DealType = '079' | '080' | '081' | '082';
export interface ContextOrderType {
  type: 'newOrder' | 'stopLimit' | 'modifyCancel';
  orderType: OrderType;
  symbol: string;
  dealType: DealType | string;
  price: number | string;
  amount: string;
  limitPrice?: number;
  stopPrice?: number;
  orderNo?: string;
  stopNo?: string;
  limitNo?: string;
  modType: string;
}

/*
  UCEL : 'limit',
  UCES : 'stop',
  UCM : 'market',
  URE : 'limit order' -> modify/cancel
*/
interface PropsType {
  children: React.ReactNode;
}

interface ReturnType {
  marginType: string;
  setMarginType:  (value: '0' | '1') => void;
  leverage: number;
  setLeverage: (value: number) => void;
  order: ContextOrderType | null;
  setOrder: (object: ContextOrderType | null) => void,
}

const defaultValue : ReturnType = {
  marginType: '0',
  setMarginType: (value: '0' | '1'): void => {},
  leverage: 10,
  setLeverage: (value: number): void => {},
  order: null,
  setOrder: (object: ContextOrderType | null): void => {},
};

export const TradeInfoContext = createContext(defaultValue);

const TradeInfoProvider = ({ children }: PropsType) => {
  const [marginType, setMarginType] = useState<'0' | '1'>('1');
  const [leverage, setLeverage] = useState(10);
  const [order, setOrder] = useState<ContextOrderType | null>(null);

  return (
    <TradeInfoContext.Provider
      value={{
        marginType,
        setMarginType,
        leverage,
        setLeverage,
        order,
        setOrder
      }}
    >
      {children}
    </TradeInfoContext.Provider>
  );
};

export default TradeInfoProvider;
