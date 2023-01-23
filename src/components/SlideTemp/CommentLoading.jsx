import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";
import { useContext } from "react";

const CommentLoading = () => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <div style={{ display: "flex", overflow: "auto" }}>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={280}
        height={210}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={280}
        height={210}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={280}
        height={210}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={280}
        height={210}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
      </ContentLoader>
    </div>
  );
};

export default withThemeWrapper(CommentLoading);
