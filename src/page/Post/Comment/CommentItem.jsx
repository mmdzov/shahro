import React, { useState } from "react";
import AuthorLogo from "../../../components/Utilities/AuthorLogo";
import AuthorName from "../../../components/Utilities/AuthorName";
import PostTime from "../../../components/Utilities/PostTime";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  sendCommentReport,
  likeComment,
} from "../../../store/actions/postAction";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReportTemplate from "components/Store/ReportTemplate";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AuthAlert from "components/Utilities/AuthAlert";
import toPersian from "utilities/ToPersian";

const CommentItem = ({ comment, likeComment, id }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [likeByMe, setLikeByMe] = useState(comment.likeMe);
  const { guestName, alert: notifAlert } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const [likes, setLikes] = useState(comment.like);
  const [open, setOpen] = useState(false);
  const { token } = useParams();
  const handleSubmit = async (e) => {
    setOpen(false);
    await dispatch(sendCommentReport(title, text, comment.token));
    setTitle("");
    setText("");
  };
  const handleCommentLike = async () => {
    if (likeByMe === 1) {
      await setLikeByMe(0);
      await setLikes(likes - 1);
      await likeComment(0, comment.token);
    } else {
      await setLikeByMe(1);
      await setLikes(likes + 1);
      await likeComment(1, comment.token);
    }
  };
  const history = useHistory();
  const { state } = useLocation();
  const handleGo = () => {
    history.push({
      pathname: `/profile/${comment.account.token}`,
      state: {
        from: "post",
        token: token,
        prevScroll: window.pageYOffset,
        lastPosition: state?.lastPosition,
      },
    });
  };
  return (
    <div className={`flex items-start px-5 my-3 commentItemContainer`} id={id}>
      <div onClick={handleGo} className="cursor-pointer">
        <AuthorLogo logo={comment.account.image} />
      </div>
      {notifAlert.mode === "likePostComment" ? (
        <AuthAlert
          alert={{
            title: notifAlert?.title || " ",
            message: notifAlert?.msg || " ",
          }}
        />
      ) : null}
      <div
        className={`relative flex justify-between items-center w-full border-b`}
        style={{ borderColor: "#eaeaea" }}
      >
        <div className={`px-2  `}>
          <AuthorName
            go={handleGo}
            classes={`font-bold mb-1`}
            name={comment?.account?.name ?? guestName}
          />
          <PostTime
            classes={`mb-3 text-right mr-2`}
            time={toPersian(comment.datetime)}
          />
          <p className={`text-sm pb-3 mr-2`}>{comment.message}</p>
        </div>
        <div
          className={`flex items-end text-gray-500`}
          style={{ direction: "ltr" }}
        >
          <span
            className="cursor-pointer"
            style={{ marginRight: "10px" }}
            onClick={() => setOpen(true)}
          >
            <FlagOutlinedIcon />
          </span>
          <span className={`cursor-pointer`} onClick={handleCommentLike}>
            {likeByMe === 1 ? (
              <FavoriteIcon style={{ color: "#ef4444" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </span>
          <span className={`px-2 text-xs`}>
            {likes > 0 ? toPersian(likes) : null}
          </span>
          {/* <span
            className={`cursor-pointer ${
              likeByMe === 1 ? "text-red-500" : ""
            }`}
            onClick={handleCommentLike}
          >
            <ThumbUpIcon />
          </span> */}
        </div>
      </div>
      {open ? (
        <ReportTemplate
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeComment: (value, token) => dispatch(likeComment(value, token)),
  };
};
export default connect(null, mapDispatchToProps)(CommentItem);
