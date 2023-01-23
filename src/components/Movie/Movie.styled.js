import styled from "styled-components";

export const MovieSingleCategory = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 15px;
  /* @media (max-width: 640px) { */
  overflow-y: auto;
  padding: 0 15px;
  /* } */
`;

export const MovieSingleCategoryItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  & .title {
    background: #f8f6f6;
    padding: 1px 9px;
    font-size: 0.7rem;
    border-radius: 100px;
    font-weight: bold;
    color: #3a3a3a;
  }
  & .icon {
    display: flex;
    margin-right: 0px;
    color: #ccc;
    & > svg {
      font-size: 1rem;
    }
  }
`;

export const MovieHeader = styled.div`
  display: grid;
  grid-template-columns: auto 2fr;
  position: relative;
  padding: 0 15px;
  & > img {
    width: 230px;
    height: 306px;
    border-radius: 5px;
  }
  @media (max-width: 640px) {
    & > img {
      width: 300px;
      height: 400px;
      border-radius: 5px;
    }
    grid-template-columns: 1fr !important;
    justify-items: center !important;
  }
`;
export const MovieHeaderLeft = styled.div`
  margin-right: 20px;
  @media (max-width: 640px) {
    margin-right: 0px !important;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    & .playIcon {
      width: 100%;
      right: 0;
    }
  }
  @media (min-width: 641px) {
    & .playIcon {
      width: auto !important;
      & > div {
        width: 110px !important;
      }
    }
  }
  & .title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: -3px;
    color: #3e3e3e;
  }
  & .description {
    margin-top: 10px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  & .from {
    margin-top: 10px;
    font-size: 0.9rem;
    font-weight: bold;
    color: #6d6d6d;
  }
  & .rate {
    display: flex;
    align-items: center;
    color: #444444;
    margin-top: 6px;
    & .rateStars {
      & > svg {
        font-size: 0.8rem;
      }
    }
    & .rateCommentCount {
      font-size: 0.9rem;
      margin-top: 5px;
      margin-right: 5px;
      font-weight: bold;
      color: #5e5e5e;
      & > span {
      }
    }
  }
  & .playIcon {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    padding: 10px 0px;
    color: white;
    width: 100%;
    font-weight: bold;
    font-size: 1.1rem;
    & > div {
      border-radius: 9px;
      direction: ltr;
      background: #df2648;
      height: 43px;
      align-items: center;
      justify-content: center;
      display: flex;
      width: 90%;
      &:hover {
        background: #b51634;
      }
    }
    & > div {
      > svg {
        font-size: 2.1rem;
        margin-left: -5px;
        margin-right: -7px;
      }
    }
    & > span {
    }
  }
`;

export const MovieDescription = styled.div`
  /* padding: 30px 0px; */
  margin: 0;
  padding: 30px 15px;
`;
export const SectionTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0 15px;
`;

export const MovieAgents = styled.div`
  padding: 0 15px;
  & > .list {
    display: flex;
    flex-wrap: wrap;
    & > .item {
      margin-left: 90px;
      margin-bottom: 20px;
      & .title {
        font-size: 1rem;
        font-weight: bold;
        color: #a2a2a2;
      }
      & .description {
        font-size: 0.9rem;
        font-weight: bold;
        color: #3f3f3f;
        line-height: 26px;
      }
    }
  }
`;

export const MoviePreview = styled.div`
  margin-top: 25px;
  & .imagePreview {
    border: 10px solid transparent;
    &:not(:last-of-type) {
      border-left: 5px solid transparent;
    }
    width: 400px;
    height: 260px;
    border-radius: 20px;
    cursor: pointer;
    overflow: hidden;
    & > img {
      width: inherit;
      height: inherit;
      object-fit: cover;
      object-position: center;
      filter: saturate(1);
      &:hover {
        filter: saturate(1.5);
      }
    }
  }
`;

export const MovieSlider = styled.div`
  margin: 30px 0px;
  & .item {
    display: flex;
    flex-direction: column;
    width: 125px !important;
    padding: 0 3px;
    /* margin: 0 5px; */
    margin-top: 5px;
    font-size: 0.9rem;
    padding-top: 2.5px;
    height: 258px;
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
      box-shadow: 0px 1px 5px 2px #eaeaea;
      border-radius: 5px;
      border: 1px solid #eee;
      & img {
        filter: saturate(1.5);
      }
    }
    & > img {
      width: 120px;
      height: 155px;
      border-radius: 5px;
      margin: 0 auto;
      filter: saturate(1);
    }
    & .title {
      margin-top: 4px;
      font-weight: bold;
      padding: 0 3px;
    }
    & .subtitle {
      font-weight: bold;
      padding: 0 3px;
    }
    & .director {
      padding: 0 3px;
      font-size: 0.74rem;
      margin-top: 15px;
      font-weight: 600;
      color: #777777;
    }
  }
`;

export const MovieBottom = styled.div`
  display: grid;
  padding: 0 15px;
  grid-template-columns: 1fr auto;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
export const MovieComment = styled.div``;

export const MovieInformation = styled.div`
  @media (max-width: 640px) {
    width: 100%;
    border: unset;
  }
  width: 240px;
  padding: 25px 15px;
  border: 1px solid #eee;
  border-radius: 15px;
  & > .list {
    & > .item {
      margin-bottom: 20px;
      & > .title {
        color: #b9b9b9;
        font-weight: 600;
      }
      & .content {
        font-size: 0.9rem;
        color: #404040;
        font-weight: bold;
      }
    }
  }
`;
export const FlexibleMoviePreview = styled.div`
  /* display: grid; */
  /* grid-template-rows: 1fr auto; */
  /* max-height: 303px; */
  overflow: hidden;
  & > div:last-of-type {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    & div {
      position: relative;
      border: 5px solid transparent;
      border-radius: 14px;
      overflow: hidden;

      & span {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #58585899;
        z-index: 99;
        border-radius: 0px;
        padding: 13px;
        color: white;
        direction: ltr;
        line-height: 36px;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
`;
export const MovieGallery = styled.div`
  background: #000000f0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 99999;
  display: grid;
  align-items: center;
  & .arrowBack {
    position: absolute;
    top: 10px;
    cursor: pointer;
    z-index: 9999999999;
    color: #d4d4d4;
    /* box-shadow: -1px 1px 7px 2px #505050; */
    right: 10px;
    border-radius: 100px;
    background: #333;
    padding: 10px;
    & > svg {
      font-size: 1.5rem;
    }
  }
  & img {
    border-bottom: 0;
    border-top: 0;
    margin-top: -2px;
    /* overflow: hidden; */
    /* border-color: black; */
  }
`;
