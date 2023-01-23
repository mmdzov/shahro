import ContentLoader from "react-content-loader";
import styled from "styled-components";
import { Scroll } from "./SlideTemp.styled";
import { useContext } from "react";
import ThemeWrapperContext from "context/ThemeWrapperContext";
import withThemeWrapper from "HOC/withThemeWrapper";

const SlideTempMenuLoader = ({ store = false }) => {
  const { colors } = useContext(ThemeWrapperContext);

  const rows = 1;
  const columns = 5;
  const coverHeight = 45;
  const coverWidth = 65;
  const padding = 8;
  const speed = 1;

  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const initial = 15;
  const covers = Array(columns * rows).fill(1);
  return (
    <div className="">
      <MenuLoader className="" style={{ direction: store ? "ltr" : "rtl" }}>
        <ContentLoader
          speed={speed}
          width={columns * coverWidthWithPadding}
          height={rows * coverHeightWithPadding}
          backgroundColor={colors?.customLoading?.background}
          foregroundcolor={colors?.customLoading?.foreground}
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
      </MenuLoader>
    </div>
  );
};
const MenuLoader = styled(Scroll)`
  display: flex;
  flex-direction: row-reverse;
  padding-left: 20px;
`;
export default withThemeWrapper(SlideTempMenuLoader);
