import {
  ListItem,
  ListItemContainer,
} from "components/SlideTemp/SlideTemp.styled";
import SlideTempImg from "components/SlideTemp/SlideTempImg";
import SlideTempList from "components/SlideTemp/SlideTempList";
import SlideTempListContent from "components/SlideTemp/SlideTempListContent";
import useSlideScroll from "hooks/useSlideScroll";
import { memo } from "react";

const StoreSlideList = ({ list }) => {
  const { lst, handleError } = useSlideScroll(list);
  return (
    <SlideTempList isRender={lst?.length === 0 ? false : true} height="245px">
      {lst?.map(({ token, image, title, price, off, error }) => (
        <ListItemContainer key={token} borderRight="10px">
          <ListItem
            id={token}
            style={{ marginRight: "10px", marginLeft: 0 }}
            borderunset="1px solid #f1eae2"
            to={{
              pathname: `/store/product/${token}`,
              state: "from-single-product",
            }}
            // onClick={() => window.scrollTo(0, 0)}
            className="productCardBackground"
          >
            <SlideTempImg
              onProblem={handleError}
              token={token}
              isError={error}
              src={image}
            />
            <SlideTempListContent
              name={title}
              price={price}
              sub={off}
              pos="center"
            />
          </ListItem>
        </ListItemContainer>
      ))}
    </SlideTempList>
  );
};

export default memo(StoreSlideList);
