import SlideTemp from "components/SlideTemp/SlideTemp";
import StoreList from "components/Store/StoreList";
import { useSelector } from "react-redux";
import { memo } from "react";

const HomeStore = () => {
  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);
  const { homeProduct, loading } = useSelector(({ product }) => product);
  return (
    <SlideTemp
      path="/store"
      // style={{
      //   marginTop: l.mode === "homeLoading" ? "-7.5px" : 0,
      // }}
      data={homeProduct}
      isBorderTop={false}
      isMarginTop
      marginBottom={10}
      loading={loading || l.mode === "homeLoading"}
      title="فروشگاه"
    >
      <StoreList list={homeProduct} />
    </SlideTemp>
  );
};

export default memo(HomeStore);
