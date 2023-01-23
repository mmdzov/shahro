import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "../../../context/ThemeWrapperContext";
import withThemeWrapper from "../../../HOC/withThemeWrapper";

const HomeAccountsLoading = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <div
      className=""
      style={{
        marginTop: -30,
        overflowY: "auto",
        overflowX: "hidden",
        transform: "rotate(180deg)",
      }}
    >
      <ContentLoader
        width="100%"
        height={100}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <circle cx="40" cy="30" r="30" />
        <circle cx="105" cy="30" r="30" />
        <circle cx="170" cy="30" r="30" />
        <circle cx="235" cy="30" r="30" />
        <circle cx="300" cy="30" r="30" />
        <circle cx="365" cy="30" r="30" />
        <circle cx="430" cy="30" r="30" />
        <circle cx="495" cy="30" r="30" />
        <circle cx="560" cy="30" r="30" />
        <circle cx="625" cy="30" r="30" />
        <circle cx="690" cy="30" r="30" />
        <circle cx="755" cy="30" r="30" />
        <circle cx="820" cy="30" r="30" />
        <circle cx="885" cy="30" r="30" />
        <circle cx="950" cy="30" r="30" />
        <circle cx="1015" cy="30" r="30" />
        <circle cx="1080" cy="30" r="30" />
        <circle cx="1145" cy="30" r="30" />
        <circle cx="1210" cy="30" r="30" />
        <circle cx="1275" cy="30" r="30" />
        <circle cx="1340" cy="30" r="30" />
        <circle cx="1405" cy="30" r="30" />
        <circle cx="1470" cy="30" r="30" />
        <circle cx="1535" cy="30" r="30" />
        <circle cx="1600" cy="30" r="30" />
        <circle cx="1665" cy="30" r="30" />
        <circle cx="1730" cy="30" r="30" />
        <circle cx="1795" cy="30" r="30" />
        <circle cx="1860" cy="30" r="30" />
        <circle cx="1925" cy="30" r="30" />
        <circle cx="1990" cy="30" r="30" />
        <circle cx="2055" cy="30" r="30" />
      </ContentLoader>
    </div>
  );
};

export default withThemeWrapper(HomeAccountsLoading);
