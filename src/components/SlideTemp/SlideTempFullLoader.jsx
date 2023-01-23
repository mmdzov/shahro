import { Fragment, useContext, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const SlideTempFullLoader = ({ itemc, listc }) => {
  const [all, setAll] = useState([]);
  const { colors } = useContext(ThemeWrapperContext);
  const [b, setB] = useState([]);
  useEffect(() => {
    const itemCount = itemc || 3;
    const listCount = listc || 3;
    let y = [...b];
    for (let i = 0; i < itemCount; i++) y.push(i);
    let x = [...all];
    for (let p = 0; p < listCount; p++) x.push(p);
    setB(y);
    setAll(x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {all.map((itemA) => (
        <ContentLoaderAll key={itemA}>
          <ContentLoader
            height={30}
            width={"100%"}
            backgroundColor={colors?.customLoading?.background}
            foregroundcolor={colors?.customLoading?.foreground}
          >
            <rect x="5%" y="5" rx="5" ry="5" width="15%" height="10" />
            <rect x="65%" y="5" rx="5" ry="5" width="30%" height="10" />
          </ContentLoader>
          <ContentLoaderItems>
            {b.map((itemB) => (
              <ContentLoader
                key={itemB}
                speed={2}
                rtl
                className="flex-shrink-0 flex-grow-0"
                width={165}
                height={234}
                backgroundColor={colors?.customLoading?.background}
                foregroundcolor={colors?.customLoading?.foreground}
              >
                <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
                <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
                <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
                <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
              </ContentLoader>
            ))}
          </ContentLoaderItems>
        </ContentLoaderAll>
      ))}
    </Fragment>
  );
};
const ContentLoaderAll = styled.div`
  margin-top: 25px;
`;
const ContentLoaderItems = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: unset;
  padding-bottom: 10px;
  margin-top: -2px;
`;
export default withThemeWrapper(SlideTempFullLoader);
