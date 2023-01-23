import {
  ListItem,
  ListItemContainer,
} from "components/SlideTemp/SlideTemp.styled";
import SlideTempImg from "components/SlideTemp/SlideTempImg";
import SlideTempList from "components/SlideTemp/SlideTempList";
import SlideTempListContent from "components/SlideTemp/SlideTempListContent";
import useSlideScroll from "hooks/useSlideScroll";
import { memo } from "react";

const StoreList = ({ list }) => {
  const { handleError } = useSlideScroll(list);

  return (
    <SlideTempList>
      {list.map(({ token, image, title, price, off, error }) => (
        <ListItemContainer key={~~(Math.random() * 999999)} borderRight="5px">
          <ListItem
            style={{ marginRight: "10px", marginLeft: 0 }}
            borderunset="1px solid #f1eae2"
            className={"productCardBackground"}
            id={token}
            to={`/store/product/${token}`}
          >
            <SlideTempImg
              onProblem={handleError}
              token={token}
              isError={error}
              src={image}
            />
            <SlideTempListContent
              pos={"center"}
              name={title}
              price={price}
              sub={off}
            />
          </ListItem>
        </ListItemContainer>
      ))}
    </SlideTempList>
  );
};
export default memo(StoreList);
