import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const { comments } = useSelector(({ post }) => post);
  return (
    <CommentListContainer className={`mt-10`} border={comments?.length === 1}>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.token}
            id={`b${comment?.token}`}
            comment={comment}
          />
        ))
      ) : (
        <p className={`text-center my-5`}>بدون نظر ، شما اولین نفر باشید!</p>
      )}
    </CommentListContainer>
  );
};
const CommentListContainer = styled.div`
  & > .commentItemContainer:last-of-type > .commentItem:last-of-type {
    border: ${({ border }) => (border ? "unset !important" : "auto")};
  }
`;
export default CommentList;
