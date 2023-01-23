import SlideTemp from "components/SlideTemp/SlideTemp";
import { useSelector } from "react-redux";
import { memo } from "react";
import FaresList from "components/Fares/FaresList";

const HomeFares = () => {
  const { HomeFares: hf, loading } = useSelector(({ fare }) => fare);
  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);
  return (
    <SlideTemp
      title="کرایه ها"
      isBorderTop={false}
      path="/rent"
      data={hf}
      // style={{
      //   // marginTop: 18,
      //   // borderTop: "1px solid #eee",
      // }}
      hasFares
      marginBottom={10}
      loading={loading || l.mode === "homeLoading"}
    >
      <FaresList list={hf} />
    </SlideTemp>
  );
};

export default memo(HomeFares);
