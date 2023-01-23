import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import ThemeWrapperContext from "../../../context/ThemeWrapperContext";
import withThemeWrapper from "../../../HOC/withThemeWrapper";

const FutureJob = (props) => {
  const { colors } = useContext(ThemeWrapperContext);

  return (
    <CalendarContainer>
      <ContentLoader
        speed={2}
        rtl
        width={"100%"}
        height={40}
        backgroundColor={colors?.customLoading?.background}
        foregroundcolor={colors?.customLoading?.foreground}
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="40" />
      </ContentLoader>
    </CalendarContainer>
  );
};
const CalendarContainer = styled.div`
  margin-top: 10px;
  padding: 0 15px;
  padding-bottom: 10px;
`;
export default withThemeWrapper(FutureJob);
