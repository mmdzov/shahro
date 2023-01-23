import ContentLoader from "react-content-loader";
import styled from "styled-components";

const SubSliderLoading = ({ title = false, y = 40 }) => {
  return (
    <LoaderContainer>
      <ContentLoader width={"100%"} height={32}>
        {title ? (
          <rect x="0" y={`${y}`} rx="0" ry="0" width="100%" height="32" />
        ) : (
          <rect x="0" y="10" rx="0" ry="0" width="30%" height="32" />
        )}
      </ContentLoader>
    </LoaderContainer>
  );
};
const LoaderContainer = styled.div`
  padding: 0 10px;
`;

export default SubSliderLoading;
