import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";
import { useContext } from "react";

const ProductSubImg = () => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <ContentLoader
      height="100%"
      width="100%"
      backgroundColor={colors?.customLoading?.background}
      foregroundcolor={colors?.customLoading?.foreground}
    >
      <rect x="15" y="50" rx="2" ry="2" width="20" height="20" />
      <rect x="40" y="50" rx="2" ry="2" width="20" height="20" />
      <rect x="60" y="83" rx="3" ry="3" width="90%" height="25" />
      <rect x="15" y="126" rx="3" ry="3" width="80" height="20" />
      <rect x="200" y="140" rx="3" ry="3" width="100%" height="15" />
    </ContentLoader>
  );
};

export default withThemeWrapper(ProductSubImg);
