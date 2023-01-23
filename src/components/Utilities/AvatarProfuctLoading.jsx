import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const AvatarProductLoading = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <div
      style={{ padding: "6px 0px" }}
      backgroundColor={colors?.customLoading?.background}
      foregroundcolor={colors?.customLoading?.foreground}
    >
      <ContentLoader height={40} width={"100%"} {...props}>
        <circle cx="93%" cy="20" r="20" stroke="black" strokeWidth="3" />
        <rect x="50%" y="18" rx="3" ry="3" width="35%" height="8" />
      </ContentLoader>
    </div>
  );
};

export default withThemeWrapper(AvatarProductLoading);
