/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import Logo from "assets/imgs/logo.png";
import FaresItem from "components/Fares/FaresItem";
import AddIcon from "components/Utilities/AddIcon";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFares } from "store/actions/fareAction";
import styled from "styled-components";

const Fares = () => {
  const { loading } = useSelector(({ _MainReducer }) => _MainReducer);
  const { fares, allowToCreate } = useSelector(({ fare }) => fare);
  const [l, setL] = useState(true);
  const dispatch = useDispatch();
  const getData = async () => {
    await setL(true);
    await dispatch(getFares());
    await setL(false);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading.mode === "adsToHome" || l)
    return <LodingDotPlus isRelative={false} isFixed isBg={l ? false : true} />;
  return (
    <FaresContainer className="">
      {fares?.map((item) => (
        <FaresItem
          key={item?.token}
          to={`/rent/${item?.token}`}
          id={item?.token}
          img={item?.image}
          title={item?.title}
          location={item?.subtitle}
        />
      ))}
      {allowToCreate === 1 ? <AddIcon mode="div" /> : null}
    </FaresContainer>
  );
};

const FaresContainer = styled.div`
  margin: 10px 0px;
  padding: 0 10px;
  display: grid;
  grid-gap: 10px;
  justify-content: center;
  & > a {
    width: auto !important;
    justify-content: center;
  }
  & .FearsCardBackground {
    justify-content: space-between !important;
    padding-bottom: 12px;
  }
  @media (max-width: 464px) {
    grid-template-columns: 1fr;
    & > a {
      height: 425px;
      & .imgContainer {
        height: auto !important;
      }
      & img {
        height: 284px !important;
      }
    }
  }
  @media (min-width: 465px) {
    grid-template-columns: repeat(2, 50%);
    & .FearsCardBackground > .imgContainer {
      height: 206px !important;
    }
    & > a {
      height: 356px !important;
    }
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 32.4%);
    & > .FearsCardBackground > .imgContainer {
      height: 180px !important;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 24.1%);
    & > .FearsCardBackground > .imgContainer {
      height: 180px !important;
    }
  }
  @media (min-width: 1250px) {
    grid-template-columns: repeat(5, 19.3%);
    /* .itemBoxBtn {
      font-size: 1.2rem !important;
    }
    .fareTitle {
      font-size: 1.6rem !important;
    }
    .fareLocation {
      font-size: 1.1rem !important;
    } */
    & > a {
      height: 350px !important;
    }

    & > a > .FearsCardBackground > .imgContainer {
      height: 200px !important;
    }
  }
  @media (min-width: 1650px) {
    /* margin-bottom: 20px !important; */
    grid-template-columns: repeat(5, 19.3%);
    /* .fareTitle {
      font-size: 1.7rem !important;
    }
    .itemBoxBtn {
      font-size: 1.2rem !important;
    }
    .fareLocation {
      font-size: 1.4rem !important;
    } */
    & > a {
      height: 350px !important;
    }

    & > a > .FearsCardBackground > .imgContainer {
      height: 200px !important;
    }
  }
  @media (min-width: 2560px) {
    /* margin-bottom: 20px !important; */
    grid-template-columns: repeat(5, 19.3%);
    /* .fareTitle {
      font-size: 1.7rem !important;
    }
    .itemBoxBtn {
      font-size: 1.2rem !important;
    }
    .fareLocation {
      font-size: 1.4rem !important;
    } */
    & > a {
      height: 350px !important;
    }

    & > a > .FearsCardBackground > .imgContainer {
      height: 200px !important;
    }
  }
`;

export default Fares;
