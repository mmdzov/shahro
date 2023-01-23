/* eslint-disable react-hooks/exhaustive-deps */
import LineEllipsis from "components/Utilities/LineEllipsis";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAdsSubCategory } from "store/actions/adsAction";
import styled from "styled-components";

const AdsSubCategory = () => {
  const { subCategory: list } = useSelector(({ ads }) => ads);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { token } = useParams();
  const getData = async () => {
    await setLoading(true);
    await dispatch(getAdsSubCategory(token));
    await setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const clickMode = (token, click) => {
    if (click === "ads") return `/ads/ads-single/${token}`;
    else if (click === "category") return `/ads/category/${token}`;
    else if (click === "category-list") return `/ads/category-list/${token}`;
  };
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      {list?.map((item) => (
        <Item key={item?.token} to={clickMode(item?.token, item?.click)}>
          <Title>
            <LineEllipsis text={item?.name} maxLine="1" ellipsis="..." />
          </Title>
          <Img src={item?.image} className="BgError" alt="" />
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div``;

const Item = styled(Link)`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 45px;
  height: 45px;
`;

const Title = styled.div`
  width: 100%;
  padding-left: 10px;
`;

export default AdsSubCategory;
