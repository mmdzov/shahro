import AddIcon from "components/Utilities/AddIcon";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import styled from "styled-components";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import AddPost from "page/AddPost/AddPost";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MediaOrderBottomSheet = ({
  visible = false,
  setVisible = () => {},
  iconDisabled = false,
}) => {
  const { allowToCreate } = useSelector(({ media }) => media);
  const [open, setOpen] = useState(visible);
  useEffect(() => {
    if (visible) setOpen(true);
    else setOpen(false);
  }, [visible]);
  const handleChange = () => {
    setOpen(false);
    setVisible(false);
  };
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight - 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.innerHeight, setHeight]);
  return (
    <>
      {!iconDisabled && allowToCreate === 1 && !open ? (
        <AddIcon mode="div" 
        onClick={() => setOpen(true)} 
        />
      ) : null}
      <SwipeUp
        onChange={handleChange}
        open={open}
        overflowHeight={!open ? 0 : 1}
      >
        <SwiperContainer
          style={{ height: height, direction: "rtl" }}
          className="homeSlideList"
        >
          {open ? (
            <LineCotnainer className="homeSlideList">
              <Line className="swipeupLine" />
            </LineCotnainer>
          ) : null}
          <AddPost isPage={false} open={open} />
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

export default MediaOrderBottomSheet;
