import ContentLoader from "react-content-loader";
import { useContext } from "react";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const ProductImg = ({ height, width }) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <ContentLoader
      speed={2}
      width={`${width ? width : "100%"}`}
      height={`${height ? height : "100%"}`}
      backgroundColor={colors?.customLoading?.background}
      foregroundcolor={colors?.customLoading?.foreground}
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
      <rect x="438" y="220" rx="0" ry="0" width="100%" height="100%" />
      <rect x="561" y="214" rx="0" ry="0" width="100%" height="100%" />
      <rect x="578" y="221" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default withThemeWrapper(ProductImg);
