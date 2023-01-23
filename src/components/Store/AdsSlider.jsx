import { Fragment } from "react";
import AdsSlideTempLoader from "components/SlideTemp/AdsSlideTempLoader";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import useLoading from "hooks/useLoading";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ScrollContainer from "react-indiana-drag-scroll";

const AdsSlider = () => {
  const { adsSliders } = useSelector(({ product }) => product);
  const { loading } = useLoading(adsSliders);
  return (
    <Wrapper length={adsSliders?.length}>
      <Scroll>
        <Container
          length={adsSliders?.length}
          className="scroll-container"
          horizontal
          hideScrollbars={false}
        >
          {!loading ? (
            adsSliders.length > 0 ? (
              adsSliders?.map((item) => (
                <Fragment key={item.image}>
                  <Img src={item?.image} alt="" />
                </Fragment>
              ))
            ) : null
          ) : (
            <AdsSlideTempLoader />
          )}
        </Container>
      </Scroll>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 0px 0px;
  display: ${({ length }) => (length > 0 ? "block" : "none")};
`;

const Container = styled(ScrollContainer)`
  width: auto;
  height: fit-content !important;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: 10px;
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, 32.5%);
  grid-template-rows: repeat(1, 100%);
  grid-gap: 0px;
  grid-auto-flow: column;
  padding-top: 10px;
  justify-items: center;
  padding-bottom: 10px;
  padding-top: 2px !important;
  @media (min-width: 1024px) {
    height: 244px;
    padding-bottom: 0;
    grid-template-columns: repeat(${({ length }) => length}, 33.2%);
  }
  @media (min-width: 1366px) {
    height: ${({ length }) => (length >= 4 ? "245px" : "270px")};
    grid-template-columns: repeat(
      ${({ length }) => length},
      ${({ length }) => (length >= 4 ? "24.99%" : "32.9%")}
    );
  }
  @media (min-width: 1600px) {
    height: ${({ length }) => (length >= 4 ? "260px" : "320px")};
  }
  @media (max-width: 1023px) {
    grid-template-columns: repeat(${({ length }) => length}, 46.9%);
    & > img {
      width: 544px;
      height: initial;
    }
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(${({ length }) => length}, 92.9%);
    & > img {
      height: initial;
    }
  }
`;

const Img = styled.img`
  width: auto;
  height: initial;
  /* height: 90%; */
  display: block;
  border-width: 10px;
  border-color: transparent;
  border-radius: 20px;
  cursor: pointer;
  /* margin: 0 5px; */
  &:hover {
    /* transform: scale(1.02); */
  }
`;

export default AdsSlider;
