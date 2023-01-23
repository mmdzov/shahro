import ContentLoader from "react-content-loader";
import { useContext } from "react";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const ProductPriceTemp = () => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <ContentLoader
      width="100%"
      height={110}
      backgroundColor={colors?.customLoading?.background}
      foregroundcolor={colors?.customLoading?.foreground}
    >
      <rect x="37" y="34" rx="0" ry="0" width="100%" height="0"></rect>
      <rect x="80%" y="29" rx="0" ry="0" width="100%" height="32"></rect>
      <rect x="70%" y="71" rx="0" ry="0" width="100%" height="32"></rect>
      <rect x="300" y="94" rx="0" ry="0" width="100%" height="0"></rect>
      <rect x="300" y="116" rx="0" ry="0" width="100%" height="32"></rect>
    </ContentLoader>
  );
};

export default withThemeWrapper(ProductPriceTemp);
