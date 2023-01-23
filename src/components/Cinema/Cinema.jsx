import { memo } from "react";
import { useSelector } from "react-redux";
import SlideTemp from "../SlideTemp/SlideTemp";
import CinemaList from "./CinemaList";

const Cinema = () => {
  const { homeCinema: c, loading } = useSelector(({ cinema }) => cinema);
  if (!loading && c.length === 0) return <div className=""></div>;
  return (
    <div style={{ marginTop: 10 }}>
      <SlideTemp
        isExist
        data={c}
        isBorderTop={false}
        isMarginTop
        loading={loading}
        marginBottom={10}
        title="سینما، تئاتر و مراسم ها"
        path={`/cinema`}
      >
        <CinemaList list={c} />
      </SlideTemp>
    </div>
  );
};

export default memo(Cinema);
