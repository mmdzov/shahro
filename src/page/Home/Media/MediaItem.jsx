import MediaImg from "./MediaImg";
import MediaContent from "./MediaContent";
import classes from "./MediaItem.module.css";
import random from "../../../assets/imgs/random.jpg";
// import Like from "../../../components/Utilities/Like";

const MediaItem = ({ fromHome = false, post }) => {
  return (
    <div
      style={{ overflow: "hidden", marginTop: 0, marginBottom: 0 }}
      className={`${classes.MediaItem}  rounded-lg border  flex-shrink-0 relative postCardBackground`}
    >
      <MediaImg
        isInitial={false}
        src={post.image !== null ? post.image : random}
        token={post.token}
      />
      {/*
      <div className={`flex flex-row-reverse m-2 `}>
        <Like likeMe={post.likeMe} like={post.like} token={post.token} />
      </div>
      */}
      <MediaContent post={post} fromHome={fromHome} />
    </div>
  );
};

export default MediaItem;
