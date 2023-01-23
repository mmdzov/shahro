import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";
import React, { useContext } from "react";
import ContentLoader from "react-content-loader";

const AvatarLoading = ({ hasRent = false, ...props }) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <>
      <ContentLoader
        style={{
          position: "absolute",
          right: "0px",
          transform: "rotate(180deg)",
          width: "100%",
          padding: "0 15px",
        }}
        height={42}
        width={"100%"}
        {...props}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="0" y="11" rx="3" ry="3" width="120px" height="15" />
      </ContentLoader>
      <ContentLoader
        height={42}
        width={"100%"}
        {...props}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        {hasRent ? (
          <rect x="60px" y="15" rx="3" ry="3" width="40px" height="15" />
        ) : null}
        <circle cx="30" cy="22" r="20" stroke="black" strokeWidth="3" />
      </ContentLoader>
    </>
  );
};

export default withThemeWrapper(AvatarLoading);
