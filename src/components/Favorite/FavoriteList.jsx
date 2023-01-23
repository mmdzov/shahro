import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useSelector } from "react-redux";
import EmptyBasket from "components/Basket/EmptyBasket";
import { ListContainer, ListItem, Content } from "../Ads/SearchListTemp.styled";
import ErrorImages from "components/Utilities/ErrorImages";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import usePath from "hooks/usePath";

const FavoriteList = ({ mode, loading }) => {
  const { favorite, loading: l } = useSelector(({ account }) => account);
  const [modeTitle, setModeTitle] = useState("");
  const [favs, setFavs] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    if (mode === "ads") setModeTitle("اگهی");
    if (mode === "posts") setModeTitle("پست");
    if (mode === "products") setModeTitle("محصول");
    if (mode === "rents") setModeTitle("کرایه");
  }, [mode]);
  const { goForward } = usePath();
  const handleGo = (e, token) => {
    const params = {
      subFrom: "favorite",
      mode,
      position: window.pageYOffset,
      from: state?.from,
    };
    if (mode === "ads") return goForward("/ads/ads-single/" + token, params);
    if (mode === "posts") return goForward("/media/post/" + token, params);
    if (mode === "products")
      return goForward("/store/product/" + token, params);
    if (mode === "rent") return goForward("/rent/" + token, params);
  };

  useEffect(() => {
    setFavs(favorite);
  }, [favorite, mode]);

  return (
    <>
      {loading || l ? (
        <LodingDotPlus isRelative={false} isFixed isBg={false} />
      ) : null}
      {/* <NotFoundIcon
          title={`لیست علاقه مندی ${modeTitle} های شما خالی است`}
          special
        /> */}
      {!loading && favs[mode]?.length === 0 ? (
        <EmptyBasket
          Icon={"Error"}
          title={`لیست علاقه مندی ${modeTitle} های شما خالی است`}
          msg=" "
          style={{ borderTop: 0 }}
        />
      ) : (
        <Lc>
          {favs[mode]?.map((item) => (
            <ListItem
              className="adsCardBackgroundInfinity"
              onClick={(e) => handleGo(e, item?.token)}
              key={~~(Math.random() * 9999999)}
            >
              <ErrorImages
                src={item?.image}
                width={100}
                height={100}
                isRadius={1}
              />
              <Content fromFavorite>
                <div className="title">{item?.title}</div>
              </Content>
            </ListItem>
          ))}
        </Lc>
      )}
    </>
  );
};

const Lc = styled(ListContainer)`
  margin-top: 60px !important;
`;

export default FavoriteList;
