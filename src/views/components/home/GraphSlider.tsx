import styled from 'styled-components';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTypedSelector } from '@/store';
import SmallGraph from '@/views/components/home/SmallGraph';
import useService from '@/hooks/useService';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const GraphSlider = () => {
  const symbols = useTypedSelector(
    (state) => Object.values(state.coinInfoSlice.symbols),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );

  return (
    <GraphSliderStyle>
      <Swiper slidesPerView="auto">
        {symbols.map((coin) => (
          <SwiperSlide key={coin.CUR_NO}>
            <SmallGraph coinInfo={coin} />
          </SwiperSlide>
        ))}
      </Swiper>
    </GraphSliderStyle>
  );
};

const GraphSliderStyle = styled.div`
  max-width: 1429px;
  margin: 80px auto 100px;
  /* padding:0 14px; */
  .swiper-wrapper{
    
  }
  .swiper-slide {
    width: auto;
    margin: 0 2%;
    margin-bottom: 2rem;
    /* &:last-child {
      margin-right: 0 !important;
    } */
    > div {
      margin: 0 auto;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    margin: 0px auto 0;
    padding-bottom: 55px;

    .swiper-slide{
      margin: 0 2%;
      margin-bottom: 2rem;
    }
  }
`;

export default GraphSlider;
