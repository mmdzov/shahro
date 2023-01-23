import PostTime from "../../components/Utilities/PostTime";
import { withRouter, Link } from "react-router-dom";
import ErrorImages from "components/Utilities/ErrorImages";
import Like from "../../components/Utilities/Like";
import { useSelector } from "react-redux";
import LineEllipsis from "components/Utilities/LineEllipsis";
import styled from "styled-components";

const MediaContent = ({ post, history }) => {
  const handleClick = (e, token) => {
    history.push({
      pathname: "/media/post/" + token,
      param: token,
      state: { lastPosition: e?.target?.offsetTop },
    });
  };
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);
  return (
    <div className={`px-4 pb-2 cursor-pointer`}>
      <MediaTitleItem
        className={`font-bold text-lg  px-2 `}
        style={{ marginTop: 10, height: 85, overflow: "hidden" }}
        onClick={(e) => handleClick(e, post.token)}
      >
        <LineEllipsis text={post?.title} maxLine="3" />
      </MediaTitleItem>
      <p
        className={`text-sm py-3 pr-3 md:h-24 md:overflow-hidden`}
        onClick={(e) => handleClick(e, post?.token)}
      >
        {post.text}
      </p>
      <div className={`flex justify-between items-center px-3`}>
        {/*<div className={`flex items-center px-3`}>*/}
        <div className={`flex items-center`}>
          <Link
            to={`/profile/${post?.account?.token}`}
            className={` cursor-pointer text-xs grid items-center`}
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <ErrorImages
              src={post?.account?.image}
              width={38}
              height={38}
              sizeIcon="1rem"
            />
            <div style={{ marginRight: 10, fontWeight: 600 }}>
              {post?.account?.name ?? guestName}
            </div>
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
          }}
        >
          <PostTime time={post.datetime.split(" ")[1].substr(0, 5)} />
          <Like likeMe={post.likeMe} like={post.like} token={post.token} />
        </div>
      </div>
    </div>
  );
};
const MediaTitleItem = styled.h2`
  @media (max-width: 768px) {
    height: auto !important;
    max-height: 85px;
  }
`;
export default withRouter(MediaContent);
