import {
  FaresItemBtnBox,
  FaresItemContainer,
  FaresItemHeader,
  FaresItem as Item,
} from "./Fares.styled";
import styled from "styled-components";
import textLimit from "utilities/textLimit";
import { ButtonBase } from "@material-ui/core";
const FaresItem = ({
  img,
  title,
  location,
  hasHomeFareItem = false,
  ...props
}) => {
  return (
    <FaresItemContainer {...props}>
      <Item
        className={`FearsCardBackground ${
          hasHomeFareItem ? "hasHomeFareItem" : ""
        }`}
        margin={hasHomeFareItem}
      >
        <ImgContainer
          className="imgContainer"
          hasHomeFareItem={hasHomeFareItem}
        >
          <Img src={img} alt="" className={`BgError`} />
        </ImgContainer>
        <FaresItemHeader>
          <div className="fareTitle">{textLimit(title, 37)}</div>
          <div className="fareLocation">{textLimit(location, 55)}</div>
        </FaresItemHeader>

        <FaresItemBtnBox mt={hasHomeFareItem} className="itemBoxBtn">
          <ButtonBase>
            <div className="seeMoreBtn">دیدن جزئیات</div>
          </ButtonBase>
          <ButtonBase>
            <div className="reserve">رزرو</div>
          </ButtonBase>
        </FaresItemBtnBox>
      </Item>
    </FaresItemContainer>
  );
};

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    border: ${({ hasHomeFareItem }) =>
      hasHomeFareItem ? "unset" : "6px solid white"};
  }
`;
const Img = styled.img`
  /* width: inherit; */
  /* height: inherit; */
  transform: scale(1.1);
  object-fit: cover;
  object-position: top;
  min-height: 200px;
`;
export default FaresItem;
