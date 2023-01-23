import React from "react";
import MediaContent from "./MediaContent";
import classes from "./MediaItem.module.css";
import Slider from "../../components/Utilities/Slider";
// import Like from "../../components/Utilities/Like";
import { withRouter } from "react-router-dom";

const MediaItem = ({ post, history, singleMediaList }) => {
  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      const offTop = e.target.offsetTop;
      history.push({
        pathname: "/media/post/" + post.token,
        param: post.token,
        state: { lastPosition: offTop },
      });
    }
  };
  return (
    <div
      className={`${classes.MediaItem} overflow-x-hidden md:rounded-md md:shadow-md postCardBackgroundInfinity`}
    >
      <div className="cursor-pointer" onClick={handleClick}>
        <Slider images={post !== null ? post.images : []} media />
      </div>
      { /*
      <div className={`flex flex-row-reverse m-2 `}>
        <Like likeMe={post.likeMe} like={post.like} token={post.token} />
      </div>
      */ }
      <MediaContent post={post} />
    </div>
  );
};

export default withRouter(MediaItem);
