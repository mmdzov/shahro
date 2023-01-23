import styled from "styled-components";

export const FeaturesContainer = styled.div`
  margin-bottom: 25px;
`;
export const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 10px;
  padding-left: 0;
  border-radius: 5px;
  box-shadow: 0 5px 10px -1px #e4e4e4;
  margin-top: 7px;
  border: 1px solid #e4e4e4;
`;

export const FeatureColumnContainer = styled.div`
  overflow: hidden;
  grid-gap: 24px 0px;
  max-height: 140px;
  padding: 0 6px;

  @media (max-width: 469px) {
    display: grid;
    /* grid-template-columns: repeat(
      ${({ count }) => count},
      ${({ count }) => (100 / count).toFixed(3) + "%"}
    ); */
    grid-template-columns: 1fr;
  }
  @media (min-width: 470px) {
    display: grid;
    /* grid-template-columns: repeat(
      ${({ count }) => count},
      ${({ count }) => (100 / count).toFixed(3) + "%"}
    ); */
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 720px) {
    display: grid;
    /* grid-template-columns: repeat(
      ${({ count }) => count},
      ${({ count }) => (100 / count).toFixed(3) + "%"}
    ); */
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1024px) {
    display: grid;
    /* grid-template-columns: repeat(
      ${({ count }) => count},
      ${({ count }) => (100 / count).toFixed(3) + "%"}
      ); */
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1320px) {
    display: grid;
    /* grid-template-columns: repeat(
        ${({ count }) => count},
        ${({ count }) => (100 / count).toFixed(3) + "%"}
        ); */
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const FeatureColumnIItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    margin: 0;

    & > input > {
      margin: 0;
      direction: ltr;
      text-align: right;
    }
  }
`;
export const FeatureButtonsContainer = styled.div``;

export const Icon = styled.div`
  padding: 5px;
  border-radius: 100px;
  background: ${({ background }) => background};
  color: white;
  margin: 5px;
  height: 35px;
  cursor: pointer;
`;
