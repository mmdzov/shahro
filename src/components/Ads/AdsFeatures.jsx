/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import toPersian from "utilities/ToPersian";
import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";

const AdsFeatures = ({ highlights = [], list, loading, datetime }) => {
  const [features, setFeatures] = useState([]);
  const checkHighlight = (title) => {
    if (highlights?.includes(title)) return true;
    return false;
  };
  useEffect(() => {
    if (!loading) {
      if (list instanceof Object) {
        const ftrs = [];
        const keys = Object.keys(list);
        const endOfObj = keys.slice(-1);
        const length = keys.length;
        const count = endOfObj > length ? endOfObj : length;
        for (let i = 0; i <= count; i++) {
          ftrs.push(list[i]);
        }
        const trimmedFeatures = ftrs.filter((item) => item);
        setFeatures(trimmedFeatures);
      } else setFeatures(list);
    }
  }, [loading]);
  if (loading)
    return (
      <LoadingContainer>
        <ContentLoader height={"214px"} width={"100%"}>
          <rect x="0" y="40" rx="0" ry="0" width="100%" height="30" />
          <rect x="0" y="80" rx="0" ry="0" width="100%" height="30" />
          <rect x="0" y="120" rx="0" ry="0" width="100%" height="30" />
          <rect x="0" y="160" rx="0" ry="0" width="100%" height="30" />
        </ContentLoader>
      </LoadingContainer>
    );
  return (
    <Container>
      <Item style={{ fontSize: ".8rem" }}>
        {toPersian(datetime?.split(" ")?.reverse()?.join(" "))}
      </Item>
      {features?.map((item, i) => (
        <Item key={i}>
          <div>{toPersian(item?.title)}</div>
          <div
            style={{
              color: checkHighlight(item?.title)
                ? "rgb(15, 120, 197)"
                : "black",
            }}
          >
            {toPersian(item?.value)}
          </div>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 25px;
  font-size: 0.9rem;
`;
const Item = styled.div`
  border-bottom: 1px solid #ded5c2;
  padding: 12px 0px;
  display: flex;
  justify-content: space-between;
  color: #565656;
  font-weight: 600;
`;
const LoadingContainer = styled.div`
  height: 214px;
  margin-bottom: 30px;
  & > svg {
    height: auto;
  }
`;
export default AdsFeatures;
