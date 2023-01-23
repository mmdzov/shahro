import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { setAdsSearchItems } from "store/actions/adsAction";

const AdsSingleCategories = () => {
  const {
    adsSingle: { categories: cats },
  } = useSelector(({ ads }) => ads);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleGo = (token) => {
    dispatch(setAdsSearchItems());
    return history.push(
      !token || token === "null" || token === null
        ? "/ads"
        : `/ads/filter/${token}`,
      { from: "adsSingle" }
    );
  };
  return (
    <Container>
      {cats?.map((item, i) => (
        <Fragment key={~~(Math.random() * 9999999)}>
          {i === cats.length - 1 ? (
            <Item
              onClick={() => handleGo(item?.token)}
              style={{
                // pointerEvents: "none",
                color: "#a9a9a9",
                cursor: "pointer",
              }}
            >
              <div key={item?.token}>{item?.name}</div>
            </Item>
          ) : (
            <Item onClick={() => handleGo(item?.token)} key={item?.token}>
              <div key={item?.token}>{item?.name}</div>
              <div>
                <ChevronRightIcon />
              </div>
            </Item>
          )}
        </Fragment>
      ))}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
  min-height: 50px;
  margin-top: 3px;
  line-height: 26px;
  padding-right: 10px;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: #525252;
  & > div:nth-child(2) {
    transition: all 0.2s ease-out;
    transform: rotate(180deg);
    & > svg {
      font-size: 1.1rem;
      margin: 0 4px;
    }
  }
  &:hover {
    & > div:nth-child(2) {
      transition: all 0.2s ease-in;
      transform: rotate(0deg);
    }
  }
`;
export default AdsSingleCategories;
