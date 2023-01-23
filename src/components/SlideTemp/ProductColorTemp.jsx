import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";
import { useContext } from "react";

const ProductColorTemp = () => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <ContentLoader
      height="150"
      width="100%"
      backgroundColor={colors?.customLoading?.background}
      foregroundcolor={colors?.customLoading?.foreground}
    >
      <rect x="200" y="55" rx="3" ry="3" width="100%" height="25" />
      <rect x="15" y="105" rx="3" ry="3" width="50" height="25" />
      <rect x="75" y="105" rx="3" ry="3" width="50" height="25" />
      <rect x="135" y="105" rx="3" ry="3" width="50" height="25" />
      <rect x="195" y="105" rx="3" ry="3" width="50" height="25" />
      <rect x="255" y="105" rx="3" ry="3" width="50" height="25" />
      <rect x="315" y="105" rx="3" ry="3" width="50" height="25" />
    </ContentLoader>
  );
};

export default withThemeWrapper(ProductColorTemp);
