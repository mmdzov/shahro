import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "../../../context/ThemeWrapperContext";
import withThemeWrapper from "../../../HOC/withThemeWrapper";

const CategoryLoading = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <div
      className="flex "
      style={{ margin: "10px 0px", marginTop: "20px", overflow: "hidden" }}
    >
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={100}
        height={40}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="10" y="0" rx="0" ry="0" width="90" height="35" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={100}
        height={40}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="10" y="0" rx="0" ry="0" width="90" height="35" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={100}
        height={40}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="10" y="0" rx="0" ry="0" width="90" height="35" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={100}
        height={40}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="10" y="0" rx="0" ry="0" width="90" height="35" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={100}
        height={40}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="10" y="0" rx="0" ry="0" width="90" height="35" />
      </ContentLoader>
    </div>
  );
};

export default withThemeWrapper(CategoryLoading);
