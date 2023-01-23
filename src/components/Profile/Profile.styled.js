import styled from "styled-components";

export const Header = styled.div`
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .resizeScale {
    transform: scale(1) !important;
  }
`;
//  background: white;

export const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: unset;
  margin-bottom: ${({ mb }) => (mb ? mb : "10px")};
`;
export const HeadTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 15px;
  /* font-weight: 600; */
  padding: 0 15px;
  margin-top: 5px;

  & > span {
    font-size: 1.2rem;
  }
`;

export const Name = styled.h1`
  display: inherit;
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #444;
  cursor: pointer;
  text-align: center;
`;

export const BtnContainer = styled.div`
  font-size: 0.9rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  max-height: 100px;
  /* margin-top: 10px; */
  flex-wrap: wrap;
  padding-bottom: 60px;
  justify-content: center;
  padding: 0;
`;

export const ProfileNav = styled.div`
  width: 100%;
  height: 45px;
  direction: ltr;
  color: #bbbbbb;
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
  /* background: white; */
  border-top: 1px solid #eee;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  /* display: grid; */
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  & > div {
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    &:not(:last-of-type) {
      border-right: 1px solid #eee;
    }
    & > svg {
      width: 100%;
    }
  }
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  direction: ltr;
  grid-gap: ${({ isLink }) => (isLink ? "0px" : "2px")};
  margin-bottom: 15px;
  padding: 0 5px;
  & > a {
    /* height: 150px !important; */
    height: ${({ h }) => h + "px"} !important;
    /* width: 150px !important; */
  }
  @media (max-width: 290px) {
    /* & > a {
      max-height: 134px !important;
    } */
  }

  @media (max-width: 395px) {
    grid-template-columns: 1fr 1fr !important;
    padding-left: 5px;
    margin-top: 5px;
  }
  @media (min-width: 470px) {
    grid-template-columns: 1fr 1fr 1fr;
    /* & > a {
      max-height: 200px !important;
    } */
  }
  @media (min-width: 660px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 660px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    /* & > a {
      height: 300px !important;
      max-height: 320px !important;
    } */
  }
  & > a.links {
    width: 90%;
    margin: auto;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    box-shadow: -1px 7px 8px -5px #d6d6d6;

    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 10px;
    border: 1px solid #eee;
    cursor: pointer;
  }
  & > a.others {
    position: relative;
    /* border-radius: 20px; */
    overflow: hidden;
    cursor: pointer;
    &::before {
      content: "";
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      margin-top: 0px;
      z-index: 9999;
      bottom: 0;
      background: #121212b0;
      height: 30px;

      /* content: "";
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      box-shadow: inset 0px -33px 19px -18px #2f2f2f;
      margin-top: 0px;
      z-index: 9999; */
    }

    & h3 {
      position: absolute;
      bottom: 5px;
      z-index: 10000;
      color: white;
      font-size: 0.8rem;
      width: 95%;
      text-align: right;
      direction: rtl;
      right: 7px;
    }

    & > div {
      height: 100% !important;
      width: 100% !important;
      border-radius: 0 !important;
      /* & img { */
      /* min-height: 190px !important;
      } */
    }
  }
`;
