import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const AdsSlideTempLoader = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  const rows = 1;
  const columns = 6;
  const coverHeight = 180;
  const coverWidth = 320;
  const padding = 5;
  const speed = 1;

  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const initial = 35;
  const covers = Array(columns * rows).fill(1);

  return (
    <ContentLoader
      speed={speed}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
      backgroundColor={colors?.customLoading?.background}
      foregroundcolor={colors?.customLoading?.foreground}
      {...props}
    >
      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
        let vx =
          (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx="0"
            ry="0"
            width={coverWidth}
            height={coverHeight}
          />
        );
      })}
    </ContentLoader>
  );
};

export default withThemeWrapper(AdsSlideTempLoader);
