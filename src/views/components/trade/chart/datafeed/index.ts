import { TradeHistoryData } from "@/services/types/Trade";
import moment from "moment";

const EXCHANGE = 'BMX';

const configurationData = {
  supported_resolutions: ['1', '5', '10', '60', '1D', '1W', '1M'],

  exchanges: [
    {
      value: EXCHANGE,
      name: EXCHANGE,
      desc: EXCHANGE,
    },
  ],
  symbols_types: [
    {
      name: 'crypto',
      value: 'crypto',
    },
  ],
};

export default function makeDataFeed(tradeHistoryArr: TradeHistoryData[], currentSymbolData: CoinInfo) {
  const currentSymbol = currentSymbolData.CUR_NO;
  const precision = currentSymbolData.PIP_LOWEST;
  return {
    onReady: (callback: (arg0: { supported_resolutions: string[]; exchanges: { value: string; name: string; desc: string; }[]; symbols_types: { name: string; value: string; }[]; }) => void) => {
      setTimeout(() => callback(configurationData));
    },
    searchSymbols: async (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => {
      // DO something here
    },
    resolveSymbol: async (symbolName: any, onSymbolResolvedCallback: (arg0: {
        ticker: string; name: any; description: any; type: string; exchange: string; timezone: string; has_empty_bars: boolean; session: string; minmov: number; pricescale: number; has_intraday: boolean; has_seconds: boolean; intraday_multipliers: string[];
        // has_no_volume: false,
        has_weekly_and_monthly: boolean; supported_resolutions: string[]; default_resolution: string; volume_precision: number; data_status: string;
      }) => void, onResolveErrorCallback: any) => {
      const symbolInfo = {
        ticker: EXCHANGE + ':' + currentSymbol,
        name: currentSymbol,
        description: currentSymbol,
        type: 'crypto',
        exchange: EXCHANGE,
        timezone: 'Asia/Seoul',

        has_empty_bars: true,
        session: '24x7',
        minmov: 1,
        pricescale: Math.pow(10, precision),
        has_intraday: true,
        has_seconds: true,
        intraday_multipliers: ['1D', '1W', '1Y', '1'],
        // has_no_volume: false,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        default_resolution: '1',
        volume_precision: 2,
        data_status: 'streaming',
      };

      onSymbolResolvedCallback(symbolInfo);
    },

    getBars: async (symbolInfo: any, resolution: any, from: any, to: any, onHistoryCallback: (arg0: never[], arg1: { noData: boolean; }) => void, onErrorCallback: any, firstDataRequest = false) => {
      if (!tradeHistoryArr.length) {
        onHistoryCallback([], { noData: true });
      } else {
        sessionStorage.bulkEnd = tradeHistoryArr.length
          ? moment(Number(tradeHistoryArr[tradeHistoryArr.length - 1].time)).format('HHmmssSSS')
          : null;
        sessionStorage.chartEnd = moment(to * 1000).format('HHmmssSSS');
        sessionStorage.time = 1;
        sessionStorage.pre_time = 'null';

         onHistoryCallback(tradeHistoryArr as any, { noData: false });
      }
    },
    subscribeBars: (symbolInfo: any, resolution: any, onRealtimeCallback: (arg0: { close: number; high: number; isBarClosed: boolean; isLastBar: boolean; low: number; open: number; time: any; volume: number; }) => void, subscribeUID: any, onResetCacheNeededCallback: any) => {
      //  onmessage???????????? const ?????????????????????
      const callbackEvent = (event: { data: string; }) => {
        const json = JSON.parse(event.data);

        if (!json.Output1) {
          return;
        }

        const trcode = json.Header.trcode,
          symbol = String(json.Output1?.szSymbol).trim();
        const { szClose, szTime, szVolume, szDate } = json.Output1;
        
        const bulkEnd = sessionStorage.bulkEnd;
        const dif = Number(bulkEnd) - Number(szTime);

        if (bulkEnd && `91_${currentSymbol}` === `${trcode}_${symbol}`) {
          //
          // bulk data??? ????????? row??? ??????????????? ????????? ???????????? data??? ?????? ?????? ??? ????????? ???????????? ?????????????????????
          const pre_time_moment = moment(sessionStorage.pre_time, 'HHmmssSSS');
          const live_time_moment = moment(szTime, 'HHmmssSSS');

          //bulk ????????? ????????? ????????? ?????? ?????????, buil??? ms ??????
          const receive_filter_time =
            dif > 0 ? moment(bulkEnd, 'HHmmssSSS').add(sessionStorage.time, 'milliseconds') : live_time_moment;

          //?????? ?????? ?????? ??????????????? ????????? ?????? ???????????????
          const milliseconds_dif =
            sessionStorage.pre_time !== 'null' && dif < 0 ? pre_time_moment.diff(live_time_moment, 'milliseconds') : 0;
          //?????? ???????????? ????????? ?????? ???????????? ??? ???????????? ?????????
          const excute_time =
            pre_time_moment < live_time_moment
              ? receive_filter_time
              : receive_filter_time.add(1 + milliseconds_dif, 'milliseconds');
          sessionStorage.time = Number(sessionStorage.time) + 1;
          sessionStorage.pre_time = excute_time.format('HHmmssSSS');

          const ob = {
            close: Number(szClose),
            high: Number(szClose),
            isBarClosed: true,
            isLastBar: false,
            low: Number(szClose),
            open: Number(szClose),
            time: excute_time,
            volume: Number(szVolume),
          };
          onRealtimeCallback(ob);
        }
      };
      
      if(window.ws){
        window.ws.removeEventListener('message', callbackEvent);
        window.ws.addEventListener('message', callbackEvent);
      }
    },
    unsubscribeBars: (subscriberUID: any) => {
      // unsubscribeFromStream(subscriberUID);
      // usdDatafedd ????????? ???????
      // const BMX:BNC_BTCUSDT_#_1
      // const info = {
      //     Header : {
      //         function : "U",
      //         termtype : "HTS",
      //         trcode : "91"
      //     },
      //     Input1 : exceptCoin(symbolInfo.name)
      // }
      // socketService.sendToAgent(info);
      // console.log(subscriberUID.split(':')[1].split('_')[1].split('_')[0])
    },
  };
}
