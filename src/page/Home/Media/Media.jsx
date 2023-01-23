import React from "react";
import MediaList from "./MediaList";
import { useSelector } from "react-redux";
import SlideTemp from "components/SlideTemp/SlideTemp";
import { memo } from "react";

const Media = () => {
  const { homeMedia, loading } = useSelector(({ media }) => media);
  return (
    <SlideTemp
      data={homeMedia}
      path="/media"
      isBorderTop={false}
      isMarginTop
      marginBottom={10}
      title="رسانه"
      paddingTop="7px"
    >
      <MediaList posts={homeMedia} loading={loading} fromHome />
    </SlideTemp>
  );
};
export default memo(Media);
