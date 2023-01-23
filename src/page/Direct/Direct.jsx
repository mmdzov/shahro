import DirectHeader from "components/Direct/DirectHeader";
import styled from "styled-components";
import DirectList from "components/Direct/DirectList";
import { useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";

const Direct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const home = document.getElementsByTagName("html")[0];
    home.classList.add("DirectHtml");
    document.body.classList.add("DirectHtml");
    return () => {
      home.classList.remove("DirectHtml");
      document.body.classList.remove("DirectHtml");
    };
  }, []);
  const { loading } = useSelector(({ _MainReducer }) => _MainReducer);

  if (loading.mode === "directToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      <DirectHeader />
      <DirectList />
    </Container>
  );
};

const Container = styled.div``;

export default Direct;
