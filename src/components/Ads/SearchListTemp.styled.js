import styled from "styled-components";

export const Content = styled.div`
  height: 100%;
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
  @media (min-width: 600px) {
    margin-right: 10px;
  }
  & > .title {
    /* margin-bottom: 34px; */
    font-size: 0.8rem;
    font-weight: 600;
    max-height: ${({ fromFavorite }) => (fromFavorite ? "95px" : "57px")};
    overflow: hidden;
    /* white-space: nowrap; */
  }
  & .price {
    font-size: 0.7rem;
    margin-bottom: 5px;
    color: rgb(15 120 197);
    /* color: #0a3b65; */
    font-weight: 600;
    white-space: nowrap;
  }
  & .productPrice {
    font-size: 0.9rem;
    color: #0080ff;
    font-weight: 600;
    white-space: nowrap;
  }

  & .productDiscount {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    color: #dc2626;
  }

  & .date {
    font-size: 0.7rem;
    font-weight: 600;
    color: #5d5d5d;
    white-space: nowrap;
  }
  @media (min-width: 1220px) {
    & > .title {
      font-size: 1rem !important;
    }
  }
`;
export const Img = styled.div`
  width: 100px;
  height: 100px;
  position: relative;

  & > .errorImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
  }
  & > img {
    width: inherit;
    height: inherit;
  }
`;
export const ListItem = styled.div`
  padding: 13px 7px;
  display: grid;
  grid-template-columns: auto 2fr;
  align-items: center;
  cursor: pointer;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
  }
`;
export const ListContainer = styled.div`
  @media (max-width: 599px) {
    margin-top: 10px;
    & > div {
      margin: 0 10px;
      padding-left: 5px;
      padding-right: 10px;
      box-shadow: 0 3px 10px -2px #c9c9c9;
      border-radius: 6px;
      border: 1px solid #e9e9e9;
      background: white;
      margin-bottom: 10px;
      cursor: pointer;
      border-bottom: 0px !important;
    }
  }
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    margin: 5px;
    & > div {
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      margin: 3px;
    }
  }
  @media (min-width: 768px) {
    display: grid;
    /* grid-template-columns: repeat(3, 37.6%); */
    grid-template-columns: repeat(3, 33.4%);
    margin: 5px;
    /* -webkit-transform: scale(0.9); */
    /* -ms-transform: scale(0.9); */
    /* transform: scale(0.8); */
    /* position: absolute; */
    /* right: -95px; */
    /* top: -110px; */
    & > div {
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      height: 130px;
      margin: 3px;
      & .title {
        font-size: 0.8rem !important;
      }
    }
  }
  @media (min-width: 900px) {
    & > div {
      & .title {
        font-size: 0.9rem !important;
      }
    }
  }
  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: repeat(3, 33.4%);
    margin: 5px;
    transform: unset !important;
    position: unset !important;
    -webkit-transform: unset !important;
    -ms-transform: unset !important;
    & > div {
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      height: 140px;
      margin: 3px;
      & .title {
        font-size: 1rem !important;
      }
    }
  }
  @media (min-width: 1281px) {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    margin: 5px;
    transform: unset !important;
    position: unset !important;
    -webkit-transform: unset !important;
    -ms-transform: unset !important;
    & > div {
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      height: 135px;
      margin: 3px;
      & .title {
        font-size: 1rem !important;
      }
    }
  }
`;
