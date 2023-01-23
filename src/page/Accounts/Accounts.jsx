import { useSelector } from "react-redux";
import HomeAccountsLoading from "../../components/Utilities/Loadings/HomeAccountsLoading";
import styled from "styled-components";
import SlideTemp from "components/SlideTemp/SlideTemp";
import AccountsItem from "./AccountsItem";
import SlideTempList from "components/SlideTemp/SlideTempList";
import { memo } from "react";

const Accounts = () => {
  const { homeAccounts, loading } = useSelector(({ account }) => account);
  const { isMobileDevice } = useSelector(({ _MainReducer }) => _MainReducer);
  if (loading)
    return (
      <div
        className=""
        style={{
          borderTop: "1px solid #f3e4d1",
          margin: "10px 0px",
          paddingTop: !loading ? "5px" : "0px",
        }}
      >
        <HomeAccountsLoading />
      </div>
    );
  return (
    <Container className="">
      <SlideTemp
        title="دوستان ما"
        loading={false}
        hasTitle={false}
        hasMoreTitle={false}
        isBorderTop={false}
        style={{ paddingTop: isMobileDevice ? "3px" : 0, marginBottom: 0 }}
      >
        <SlideTempList
          isMain={true}
          showBtn={false}
          style={{ display: "flex" }}
        >
          {homeAccounts?.map((item) => (
            <AccountsItem item={item} key={item?.token} />
          ))}
        </SlideTempList>
      </SlideTemp>
    </Container>
  );
};

const Container = styled.div`
  /* padding: 13px 0px; */
  /* margin-top: 5px; */
  /* margin-bottom: 25px; */
  /* margin-bottom: 15px; */
  overflow: hidden;
  /* margin: 10px 0px !important; */
  & .flickity-viewport {
    height: 70px !important;
  }
  & .flickity-slider {
    align-items: center;
  }
  & .flickity-slider > div {
    border-bottom: 0px;
    margin-top: 0px;
  }
`;

export default memo(Accounts);
