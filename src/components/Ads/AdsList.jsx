import {
  ListItem,
  ListItemContainer,
} from "components/SlideTemp/SlideTemp.styled";
import useSlideScroll from "hooks/useSlideScroll";
import SlideTempList from "components/SlideTemp/SlideTempList";
import SlideTempImg from "components/SlideTemp/SlideTempImg";
import SlideTempListContent from "components/SlideTemp/SlideTempListContent";
import { memo } from "react";
const AdsList = ({ list }) => {
  const { handleError } = useSlideScroll(list);
  return (
    <SlideTempList>
      {list.map(({ token, image, name, props1, props2, error }) => (
        <ListItemContainer key={token} borderRight="5px">
          <ListItem
            style={{ marginRight: "10px", marginLeft: 0 }}
            to={`ads/ads-single/${token}`}
            id={token}
            className={"adsCardBackground"}
            borderunset="0px"
          >
            <SlideTempImg
              onProblem={handleError}
              token={token}
              isError={error}
              src={image}
              isAds
            />
            <SlideTempListContent
              name={name}
              price={props1}
              sub={props2}
              pos="center"
              mode="ads"
              isAds
            />
          </ListItem>
        </ListItemContainer>
      ))}
    </SlideTempList>
  );
};

export default memo(AdsList);
