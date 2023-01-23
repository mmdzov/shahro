import ContentLoader from "react-content-loader";
import styled from "styled-components";
import { useContext } from "react";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const SlideContentLoader = ({ hasFares = false }) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <ContentLoaderWrapper>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        rtl
        className="flex-shrink-0 flex-grow-0"
        width={hasFares ? 200 : 165}
        height={hasFares ? 260 : 234}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
      >
        <rect x="30" y="10" rx="0" ry="0" width="260" height="180" />
        <rect x="30" y="200" rx="5" ry="5" width="250" height="10" />
        <rect x="30" y="220" rx="5" ry="5" width="120" height="10" />
        <rect x="30" y="240" rx="5" ry="5" width="220" height="10" />
      </ContentLoader>
    </ContentLoaderWrapper>
  );
};

const ContentLoaderWrapper = styled.div`
  display: inline-flex;
  margin-right: -8px;
`;

export default withThemeWrapper(SlideContentLoader);
