import { useEffect, useState } from "react";
import AddIcon from "components/Utilities/AddIcon";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import AddProduct from "page/AddProduct/AddProduct";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StoreOrderBottomSheet = ({
  visible = false,
  setVisible = () => {},
  iconDisabled = false,
}) => {
  const [open, setOpen] = useState(visible);

  const handleChange = () => {
    setOpen(false);
    setVisible(false);
  };
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight - 150);
  }, []);
  useEffect(() => {
    if (visible) setOpen(true);
    else setOpen(false);
  }, [visible]);
  const { allowToCreate } = useSelector(({ product }) => product);

  return (
    <>
      {!iconDisabled && allowToCreate === 1 && !open ? (
        <AddIcon mode="div" onClick={() => setOpen(true)} />
      ) : null}
      <SwipeUp
        onChange={handleChange}
        open={open}
        overflowHeight={!open ? 0 : 1}
      >
        <SwiperContainer style={{ height: height, direction: "rtl" }}>
          {open ? (
            <LineCotnainer className="homeSlideList">
              <Line className="swipeupLine" />
            </LineCotnainer>
          ) : null}
          <AddProduct isPage={false} />
        </SwiperContainer>
      </SwipeUp>
    </>
  );
};
const SwiperContainer = styled(Scroll)``;
const SwipeUp = styled(SwipeableBottomSheet)``;
const Line = styled.div`
  width: 30px;
  height: 3px;
`;
const LineCotnainer = styled.div`
  height: 46px;
  cursor: pointer;
  /* border-radius: 30px 30px 0 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: absolute;
  top: -45px;
  width: 100%;
  left: 0;
  border-radius: 40px 40px 0 0;
`;
export default StoreOrderBottomSheet;
