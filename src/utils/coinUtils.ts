import { CoinOutput, RealTimeCoinOutput } from "@/store/realTime/types/realTimeData";
import { formatNumber } from "./numberUtils";

export const formatSymbolData = (obj : RealTimeCoinOutput, pipLowest = 2) => {
    if (!obj) return {};
  
    const getChangePerc = () => {
      if (obj.fPreClose === 0) {
        return '0.00';
      } else {
        return (((Number(obj.fClose) - Number(obj.fPreClose)) / Number(obj.fPreClose)) * 100).toFixed(2);
      }
    };
  
    const close = formatNumber(obj.fClose, pipLowest);
    const volume = obj.fVolume;
    const curNo = obj.CUR_NO;
    const szHigh = formatNumber(obj.fHigh, pipLowest);
    const szLow = formatNumber(obj.fLow, pipLowest);
    const maxOrderCount = obj.MAX_ORDCNT;
    const preClose = formatNumber(obj.fPreClose, pipLowest);
    const status = obj.fPreClose > obj.fClose ? 'down' : 'up';
    const changePerc = getChangePerc();
    const isFavorite = obj.isFavorite;
    const isUp = Number(changePerc) > 0;
  
    return {
      close,
      szHigh,
      szLow,
      maxOrderCount,
      volume,
      curNo,
      preClose,
      status,
      changePerc,
      isFavorite,
      isUp,
    };
  };

  export const formatSymbolLiveData = (obj, pipLowest = 2) => {
    if (!obj) return {};
  
    // Object.keys(obj).forEach((key) => {
    //   obj[key] = Number(obj[key]);
    // });
  
    const getChangePerc = () => {
      if (isNaN(Number(obj.szPreClose))) {
        return '0.00';
      } else {
        return (((Number(obj.szClose) - Number(obj.szPreClose)) / Number(obj.szPreClose)) * 100).toFixed(2);
      }
    };
  
    const close = formatNumber(Number(obj.szClose), pipLowest);
    const volume = obj.fVolume;
    const curNo = obj.szSymbol;
    const szHigh = formatNumber(obj.szHigh, pipLowest);
    const szLow = formatNumber(obj.szLow, pipLowest);
    const preClose = formatNumber(Number(obj.szPreClose), pipLowest);
    const status = Number(obj.szPreClose) > Number(obj.szClose) ? 'down' : 'up';
    const changePerc = getChangePerc();
    const isUp = Number(changePerc) > 0;
  
    return {
      close,
      szHigh,
      szLow,
      volume,
      curNo,
      preClose,
      status,
      changePerc,
      isUp,
    };
  };