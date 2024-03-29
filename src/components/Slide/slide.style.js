import Slider from "react-slick";
import styled from "styled-components";

export const SliderBox = styled(Slider)`
  padding-top: 90px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide img {
    cursor: pointer;
  }
`;

export const PreDiv = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 30px;
  z-index: 10;
`;

export const NextDiv = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 60px;
  z-index: 10;
`;
