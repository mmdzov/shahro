/* eslint-disable no-unused-vars */
import DeleteIcon from "components/Utilities/DeleteIcon";
import CommentForm from "page/Post/Comment/CommentForm";
import CommentList from "page/Post/Comment/CommentList";
import { MovieComment as Container } from "./Movie.styled";

const MovieComment = () => {
  return (
    <Container>
      {/* {post?.hasComment === 1 ? ( */}
      <CommentForm
      // token={post?.token}
      />
      {/* ) : (<Msg>نوشتن نظر برای شما در این مطلب محافظت می شود.</Msg>
      )} */}
      {/* {post?.isMe === 1 ? (
        <DeleteIcon
          style={{ bottom: 65 }}
          onClick={() => setSureAlert((prev) => !prev)}
        />
      ) : null} */}
      {/* {post?.isMe === 1 ? ( */}
      {/* <AddIcon Icon={EditIcon} to={`/media/compose/${post?.token}`} /> */}
      {/* ) : null} */}
      {/* {post?.showComments === 1 ?  */}
      <CommentList />
      {/* : null} */}
    </Container>
  );
};

export default MovieComment;
