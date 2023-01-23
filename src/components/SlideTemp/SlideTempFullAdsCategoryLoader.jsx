import { Fragment, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import { useContext } from "react";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const SlideTempFullAdsCategoryLoader = ({ itemc, listc }) => {
  const [all, setAll] = useState([]);
  const [b, setB] = useState([]);
  const { colors } = useContext(ThemeWrapperContext);

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
                height={170}
                backgroundColor={colors?.customLoading?.background}
                foregroundcolor={colors?.customLoading?.foreground}
              >
                <rect x="30" y="10" rx="0" ry="0" width="260" height="145" />
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
export default withThemeWrapper(SlideTempFullAdsCategoryLoader);
