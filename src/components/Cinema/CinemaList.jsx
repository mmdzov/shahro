import {
  ListItem,
  ListItemContainer,
} from "components/SlideTemp/SlideTemp.styled";
import SlideTempList from "components/SlideTemp/SlideTempList";
import styled from "styled-components";
import SlideTempImg from "../SlideTemp/SlideTempImg";
import useSlideScroll from "hooks/useSlideScroll";
import { memo } from "react";

const CinemaLink = ({ children, ...props }) => {
  return (
    <ListItemContainer>
      <Item borderunset="0px" {...props}>
        {children}
      </Item>
    </ListItemContainer>
  );
};

const CinemaList = ({ list: c }) => {
  const { lst, handleError } = useSlideScroll(c, "adsCategory");
  return (
    <List h="210px">
      {lst?.map(({ token, image, error, id }) => (
        <CinemaLink
          id={token}
          key={~~(Math.random() * 999999)}
          to={`/cinema/movie/${token}`}
          // onClick={() => history.push(`/cinema/${token}`)}
        >
          <SlideTempImg
            onProblem={handleError}
            token={id}
            isError={error}
            src={image}
          />
        </CinemaLink>
      ))}
    </List>
  );
};
const List = styled(SlideTempList)`
  padding-top: 0px;
  margin-bottom: 10px;
  margin-top: -5px;
`;
const Item = styled(ListItem)`
  & > div {
    height: 186px !important;
    width: 157px;
    cursor: pointer;
    box-shadow: 0px 4px 6px -3px #a0a0a0;
    margin-top: 0px;
    & > img {
      height: inherit !important;
    }
  }
`;
export default memo(CinemaList);
