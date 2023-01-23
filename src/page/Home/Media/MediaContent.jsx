import React, { useState } from "react";
// import PostTime from "../../../components/Utilities/PostTime";
import { withRouter } from "react-router-dom";
import ErrorImages from "components/Utilities/ErrorImages";
import { Link } from "react-router-dom";
import Like from "../../../components/Utilities/Like";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MediaContent = ({ post, fromHome = false, history }) => {
  const [error, setError] = useState(true);
  const callback = (e, bool) => {
    setError(bool);
  };
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);

  return (
    <div
      // onClick={(e) => handleClickPost(e, post.token)}
      className="cursor-pointer"
    >
      <Title
        className={`m-2 px-2 overflow-hidden`}
        style={{ height: 41 }}
        fromHome={fromHome}
        onClick={() => history.push(`/media/post/${post?.token}`)}
      >
        {post.title}
      </Title>

      <div
        className={`flex justify-between items-center px-2`}
        style={{ paddingBottom: "8px" }}
      >
        <Link
          className={` cursor-pointer text-xs grid items-center`}
          style={{ gridTemplateColumns: "auto 1fr" }}
          to={{
            pathname: "/media/post/" + post?.token,
            param: post?.token,
          }}
        >
          <ErrorImages
            src={post?.account?.image}
            width={38}
            height={38}
            sizeIcon="1rem"
            cb={callback}
            isError={error}
          />
          <ProfileName
            style={{ marginRight: 10, fontWeight: 600 }}
            fromHome={fromHome}
          >
            {post?.account?.name ?? guestName}
          </ProfileName>
        </Link>

        <Like likeMe={post.likeMe} like={post.like} token={post.token} />
        {/*<PostTime time={post?.datetime} />*/}
      </div>
    </div>
  );
};

const Title = styled.h2`
  ${({ fromHome }) =>
    fromHome ? `font-size: 0.900rem; font-weight: bold` : ""}
`;

const ProfileName = styled.div`
  ${({ fromHome }) =>
    fromHome
      ? `
font-size: 0.78rem;
color: #737881;
`
      : ""}
`;

export default withRouter(MediaContent);
