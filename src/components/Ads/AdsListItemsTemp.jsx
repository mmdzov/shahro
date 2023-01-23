/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import ImageIcon from "@material-ui/icons/Image";
import { ListContainer, ListItem, Content, Img } from "./SearchListTemp.styled";
const AdsListItemsTemp = ({ ads, fromSearch = false }) => {
  const [list, setList] = useState(ads);
  const history = useHistory();
  const handleImgError = (e, token) => {
    e.preventDefault();
    const l = [...ads];
    const index = ads.findIndex((item) => item.token === token);
    l[index].error = true;
    setList(l);
  };
  useEffect(() => {
    if (ads.length > 0) {
      setList(ads);
    }
  }, [ads]);
  return (
    <Container>
      {ads?.map((item) => (
        <ListItem
          style={{ padding: 0, borderRadius: "7px", overflow: "hidden" }}
          className="adsCardBackgroundInfinity"
          onClick={() =>
            history.push(`/ads/ads-single/${item?.token}`, {
              fromSearch,
              lastPosition: window.pageYOffset,
            })
          }
          key={item?.token}
        >
          <Img style={{ width: "115px", height: "115px" }}>
            <img
              src={item?.image}
              alt=""
              onError={(e) => handleImgError(e, item?.token)}
            />
            {item.error ? (
              <div className="errorImg">
                <ImageIcon />
              </div>
            ) : null}
          </Img>
          <Content style={{ padding: " 6px 0px" }}>
            {item?.title ? <div className="title">{item?.title}</div> : null}
            <div className="">
              {/* <div className="date">{item?.props1}</div>
              <div className="price">{item?.props2}</div> */}
              {item?.props2 !== "" && item?.props2 !== "" ? (
                <>
                  <div className="date">{item?.props1}</div>
                  <div className="price">{item?.props2}</div>
                </>
              ) : item?.props2 !== "" ? (
                <div className="price">{item?.props2}</div>
              ) : (
                <div className="price">{item?.props1}</div>
              )}
            </div>
          </Content>
        </ListItem>
      ))}
    </Container>
  );
};

const Container = styled(ListContainer)`
  @media (min-width: 768px) {
    & > div > div:first-of-type {
      width: 130px !important;
      height: 100% !important;
    }
  }
`;

export default AdsListItemsTemp;
