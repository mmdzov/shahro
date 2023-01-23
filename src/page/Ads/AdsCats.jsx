/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getAdsCatsCompose } from "store/actions/adsAction";
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { useState } from "react";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import usePath from "hooks/usePath";

const AdsCats = () => {
  const { cats } = useSelector(({ ads }) => ads);
  const dispatch = useDispatch();
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getAdsCatsCompose(category ?? null));
    await setLoading(false);
  };
  const { goForward } = usePath();
  const { pathname } = useLocation();
  const handleGoCat = (item) => {
    if (item.type === "sub") goForward(`/ads/compose/${item.token}`);
    else if (item.type === "item") goForward("/ads/compose/new");
  };
  useEffect(() => {
    if (!pathname.includes("new")) {
      getDatas();
    } else setLoading(false);
  }, [pathname]);
  if (pathname.includes("new")) return <div className=""></div>;
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <CatContainer>
      {cats?.map((item) => (
        <CatItem
          onClick={() => handleGoCat(item)}
          key={~~(Math.random() * 999999)}
        >
          <Y>
            <div>{item.name}</div>
            <Icon>
              <KeyboardArrowLeftIcon />
            </Icon>
          </Y>
        </CatItem>
      ))}
    </CatContainer>
  );
};
const Icon = styled.div`
  & > svg {
    font-size: 1.4rem;
    color: #ccc;
  }
`;
const Y = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px;
`;
const CatItem = styled.div`
  cursor: pointer;
  &:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }
`;
const CatContainer = styled.div``;
export default AdsCats;
