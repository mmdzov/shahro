import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect, useSelector } from "react-redux";
import { likePost } from "../../store/actions/postAction";
import AuthAlert from "./AuthAlert";

const Like = ({ likeMe, like, token, likePost }) => {
  const [likeByMe, setLikeByMe] = useState(likeMe);
  const [likes, setLikes] = useState(like);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  useEffect(() => {
    setLikeByMe(likeMe);
    setLikes(like);
  }, [like, likeMe, token]);
  const handleLike = () => {
    if (likeByMe === 1) {
      likePost(0, token);
      setLikeByMe(0);
      setLikes(likes - 1);
    } else {
      likePost(1, token);
      setLikeByMe(1);
      setLikes(likes + 1);
    }
  };

  return (
    <div className={`flex items-end mb-1`}>
      {notifAlert.mode === "likePost" ? (
        <AuthAlert
          alert={{ title: notifAlert.title || " ", message: notifAlert.msg }}
        />
      ) : null}
      {likes !== 0 ? (
        <span
          className={`text-xs text-gray-500 pl-1 pb-1`}
          style={{ lineHeight: "15px" }}
        >
          {likes}
        </span>
      ) : null}
      {/* onclick for like goes to span  */}
      <span onClick={handleLike}>
        {likeByMe === 0 ? (
          <FavoriteBorderIcon className={` cursor-pointer text-red-500`} />
        ) : (
          <FavoriteIcon className={` cursor-pointer text-red-500`} />
        )}
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (value, token) => dispatch(likePost(value, token)),
  };
};

export default connect(null, mapDispatchToProps)(Like);
