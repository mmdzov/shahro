const { default: Carousel } = require("nuka-carousel");
const { default: styled } = require("styled-components");

export const AdsSlider = styled(Carousel)`
  padding: 0 3px;
  box-sizing: border-box;
  height: 332px !important;
  direction: rtl;
  & .slider-list {
    height: auto !important;
  }
  & .slider-slide.slide-visible.slide-current {
    height: auto !important;
  }
  & .slider-control-bottomcenter > ul {
    top: -30px !important;
  }
  & .slider-control-bottomcenter > ul > li > button {
    top: -30px !important;
  }
  & .slider-control-bottomcenter > ul > li > button {
    border: 1px solid white !important;
    opacity: 1 !important;
    background: transparent !important;
    fill: transparent !important;
  }
  & .slider-control-bottomcenter > ul .paging-item.active > button {
    background: white !important;
    fill: white !important;
  }
`;
