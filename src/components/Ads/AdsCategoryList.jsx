import {
  ListItem,
  ListItemContainer,
} from "components/SlideTemp/SlideTemp.styled";
import SlideTempList from "components/SlideTemp/SlideTempList";
import SlideTempImg from "components/SlideTemp/SlideTempImg";
import { memo } from "react";
const AdsCategoryList = ({ list }) => {
  const clickMode = (token, click) => {
    if (click === "ads") return `/ads/ads-single/${token}`;
    else if (click === "category") return `/ads/category/${token}`;
    else if (click === "category-list") return `/ads/category-list/${token}`;
  };
  return (
    <SlideTempList>
      {list.map(({ token, background, name, error, id, click }) => (
        <ListItemContainer>
          <ListItem
            style={{ boxShadow: "unset" }}
            w="145px"
            id={id}
            key={id}
            to={clickMode(token, click)}
          >
            <SlideTempImg
              token={id}
              isError={error}
              src={background}
              name={name}
              hasAdsCategory
            />
          </ListItem>
        </ListItemContainer>
      ))}
    </SlideTempList>
  );
};
export default memo(AdsCategoryList);
