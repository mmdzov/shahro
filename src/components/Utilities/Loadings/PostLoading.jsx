import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "../../../context/ThemeWrapperContext";
import withThemeWrapper from "../../../HOC/withThemeWrapper";

const ArticleLoader = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <>
      <ContentLoader
        rtl
        width={"100%"}
        height={1200}
        style={{ marginTop: "-18px" }}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <circle cx="30" cy="88" r="20" stroke="black" strokeWidth="3" />
        <rect x="65" y="86" rx="3" ry="3" width="150" height="8" />
        <rect x="0" y="120" rx="4" ry="4" width="100%" height="291" />
        <rect x="48" y="515" rx="4" ry="4" width="85%" height="15" />
        <rect x="49" y="547" rx="4" ry="4" width="70%" height="15" />
        <rect x="48" y="581" rx="4" ry="4" width="85%" height="15" />
        <rect x="49" y="612" rx="4" ry="4" width="65%" height="15" />
        <rect x="48" y="652" rx="4" ry="4" width="85%" height="15" />
        <rect x="48" y="684" rx="4" ry="4" width="70%" height="15" />
        <rect x="48" y="718" rx="4" ry="4" width="85%" height="15" />
        <rect x="49" y="748" rx="4" ry="4" width="60%" height="15" />
        <circle cx="713" cy="810" r="9" />
        <circle cx="739" cy="810" r="9" />
        <rect x="41" y="836" rx="4" ry="4" width="85%" height="3" />
        <rect x="122" y="880" rx="4" ry="4" width="25%" height="11" />
        <circle cx="79" cy="900" r="26" />
        <rect x="135" y="901" rx="4" ry="4" width="8%" height="10" />
        <rect x="123" y="949" rx="4" ry="4" width="25%" height="11" />
        <circle cx="80" cy="969" r="26" />
        <rect x="136" y="970" rx="4" ry="4" width="8%" height="10" />
        <rect x="124" y="1021" rx="4" ry="4" width="25%" height="11" />
        <circle cx="81" cy="1041" r="26" />
        <rect x="137" y="1042" rx="4" ry="4" width="8%" height="10" />
        <rect x="125" y="1090" rx="4" ry="4" width="25%" height="11" />
        <circle cx="82" cy="1110" r="26" />
        <rect x="138" y="1111" rx="4" ry="4" width="8%" height="10" />
      </ContentLoader>
    </>
  );
};

ArticleLoader.metadata = {
  name: "Sridhar Easwaran",
  github: "sridhareaswaran",
  description: "Article or News",
  filename: "ArticleLoader",
};

export default withThemeWrapper(ArticleLoader);
