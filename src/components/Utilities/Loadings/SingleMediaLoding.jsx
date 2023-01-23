import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "../../../context/ThemeWrapperContext";
import withThemeWrapper from "../../../HOC/withThemeWrapper";
const MediaListLoading = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <div className="w-screen overflow-x-hidden">
      <ContentLoader
        speed={2}
        rtl
        width={"100%"}
        height={380}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="0" y="10" rx="0" ry="0" width="100%" height="250" />
        <rect x="0" y="270" rx="5" ry="5" width="90%" height="20" />
        <rect x="0" y="300" rx="5" ry="5" width="50%" height="20" />
        <rect x="0" y="330" rx="5" ry="5" width="70%" height="20" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        width={"100%"}
        height={380}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="0" y="10" rx="0" ry="0" width="100%" height="250" />
        <rect x="0" y="270" rx="5" ry="5" width="90%" height="20" />
        <rect x="0" y="300" rx="5" ry="5" width="50%" height="20" />
        <rect x="0" y="330" rx="5" ry="5" width="70%" height="20" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        width={"100%"}
        height={380}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="0" y="10" rx="0" ry="0" width="100%" height="250" />
        <rect x="0" y="270" rx="5" ry="5" width="90%" height="20" />
        <rect x="0" y="300" rx="5" ry="5" width="50%" height="20" />
        <rect x="0" y="330" rx="5" ry="5" width="70%" height="20" />
      </ContentLoader>
    </div>
  );
};

export default withThemeWrapper(MediaListLoading);
