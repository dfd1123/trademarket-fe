/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import useService from '@/hooks/useService';
import { useParams } from 'react-router';
import { widget } from './lib/charting_library';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/store';
import makeDataFeed from './datafeed';

const UP_COLOR = '#41DA78';
const DOWN_COLOR = '#F8585A';
const PRIMARY_COLOR = '#1E1F23';
const LINE_COLOR = '#33353B';

const Chart = ({
  container_id = 'chart_container',
  libraryPath = '/charting_library/',
  chartsStorageUrl = 'https://saveload.tradingview.com',
  chartsStorageApiVersion = '1.1',
  clientId = 'tradingview.com',
  userId = 'public_user_id',
  fullscreen = false,
  autosize = true,
  studiesOverrides = {},
}) => {
  const { symbol: selectedSymbol } = useParams();
  const currentCoin = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[selectedSymbol as string] || {}
  );
  const services = useService();
  const { tradeHistory, tradeHistoryFetchData } =
    services.chart.getTradeHistory(selectedSymbol as string, 1, 3, 500);
  const [interval, setInterval] = useState('D');

  useEffect(() => {
    console.log('JW', tradeHistory.length);
    let datafeed = makeDataFeed(tradeHistory, currentCoin);

    const widgetOptions = {
      debug: false,
      symbol: selectedSymbol,
      datafeed: datafeed,
      interval: interval,
      container_id: container_id,
      library_path: libraryPath,
      precision: 0.001,
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen: fullscreen,
      autosize: autosize,
      studies_overrides: studiesOverrides,
      timezone: 'Asia/Seoul',
      theme: 'dark',
      toolbar_bg: PRIMARY_COLOR,
      // toolbar_bg: 'transparent',
      loading_screen: {
        backgroundColor: PRIMARY_COLOR,
      },
      overrides: {
        //experimental
        // theme: PRIMARY_COLOR,
        'paneProperties.background': PRIMARY_COLOR,
        'paneProperties.vertGridProperties.color': LINE_COLOR,
        'paneProperties.horzGridProperties.color': LINE_COLOR,

        // 'symbolWatermarkProperties.color': '#000000',
        // 'symbolWatermarkProperties.transparency': 100,
        'scalesProperties.textColor': LINE_COLOR,
        // "symbolWatermarkProperties.transparency": 90,
        // "scalesProperties.textColor" : "#AAA",
        'scalesProperties.lineColor': LINE_COLOR,
        'scalesProperties.backgroundColor': UP_COLOR,

        'mainSeriesProperties.candleStyle.upColor': UP_COLOR,
        'mainSeriesProperties.candleStyle.downColor': DOWN_COLOR,
        'mainSeriesProperties.candleStyle.borderUpColor': UP_COLOR,
        'mainSeriesProperties.candleStyle.borderDownColor': DOWN_COLOR,
        'mainSeriesProperties.candleStyle.wickUpColor': UP_COLOR,
        'mainSeriesProperties.candleStyle.wickDownColor': DOWN_COLOR,

        'mainSeriesProperties.baselineStyle.baselineColor':
          'rgba( 117, 134, 150, 1)',
      },
    };

    let tvWidget = new widget(widgetOptions as any);

    tvWidget.onChartReady(() => {
      tvWidget.addCustomCSSFile('./custom-chart-css.css');

      tvWidget.headerReady().then((data) => {
        //do something here
      });

      tvWidget
        .activeChart()
        .onIntervalChanged()
        .subscribe(null, (interval, timeframeObj) => {
          let nMinTerm = '1';
          // console.log('JW SSS',['1D', '1W', '1M'].includes(interval));
          if (['1D', '1W', '1M'].includes(interval)) {
            setInterval(interval.replace('1', ''));
            if (interval === '1D') nMinTerm = '1';
            else if (interval === '1W') nMinTerm = '7';
            else if (interval === '1M') nMinTerm = '30';
            console.log('JW SSS', nMinTerm, 3);
            tradeHistoryFetchData(nMinTerm, 3);
          } else {
            setInterval(interval);
            nMinTerm = interval;
            tradeHistoryFetchData(nMinTerm, 2);
          }
        });
    });

    return () => {
      tvWidget.remove();
    };
  }, [tradeHistory, interval]);

  return (
    <ChartStyle>
      <div id={container_id} className="chart-cont"></div>
    </ChartStyle>
  );
};

const ChartStyle = styled.div`
  width: 50%;
  height: 493px;
  .chart-cont {
    height: 100%;
  }
`;

export default Chart;
