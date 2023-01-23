/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PostContent from "./PostContent";
import PostTime from "../../components/Utilities/PostTime";
import Like from "../../components/Utilities/Like";
import CommentForm from "./Comment/CommentForm";
import CommentList from "./Comment/CommentList";
import { useDispatch, useSelector } from "react-redux";
import PostLoading from "../../components/Utilities/Loadings/PostLoading";
import { getComments, getPost } from "../../store/actions/postAction";
import Slider from "../../components/Utilities/Slider";
import Audio from "../../components/Utilities/Audio";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link, useHistory, useLocation } from "react-router-dom";
import ErrorImages from "components/Utilities/ErrorImages";
import styled from "styled-components";
import AddIcon from "components/Utilities/AddIcon";
import EditIcon from "@material-ui/icons/Edit";
import AuthAlert from "components/Utilities/AuthAlert";
import {
  clearErrMsg,
  setAlert,
  setErrMsg,
  setLoading as setMainLoading,
} from "store/actions/_MainAction";
import handleApiErrors from "utilities/handleApiErrors";
import AreYouSure from "components/Utilities/AreYouSure";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import Delete from "@material-ui/icons/Delete";
import DeleteIcon from "components/Utilities/DeleteIcon";
import postService from "api/postService";
import usePath from "hooks/usePath";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
const Post = () => {
  const { token } = useParams();
  const { prevPaths } = useSelector(({ path }) => path);
  const { loading: mainLoading } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const history = useHistory();
  const { post, comments } = useSelector(({ post }) => post);
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  const getSinglePost = async () => {
    try {
      await setLoading(true);
      await dispatch(getPost(token, history));
      await dispatch(getComments(token));
      await setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (post !== null) {
      setLoading(false);
    }
  }, [post]);

  useEffect(() => {
    console.log(prevPaths, prevPaths.slice(-1)[0]?.state?.prevScroll > 0);
    if (
      comments &&
      post &&
      comments?.length > 0 &&
      prevPaths.length > 0 &&
      !loading &&
      prevPaths.slice(-1)[0]?.state?.prevScroll > 0
    ) {
      window.scrollTo({
        top: prevPaths.slice(-1)[0]?.state?.prevScroll,
        left: 0,
      });
    } else {
      // window.scrollTo(0, 0);
    }
  }, [post]);

  useEffect(() => {
    if (prevPaths.slice(-1)[0]?.state?.prevScroll > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: prevPaths.slice(-1)[0]?.state?.prevScroll,
          left: 0,
        });
      }, 0);
    } else window.scrollTo(0, 0);
  }, [prevPaths]);

  useEffect(() => {
    console.log(window.pageYOffset, prevPaths.slice(-1)[0]?.state?.prevScroll);
    if (!post || token !== post?.token) {
      getSinglePost();
    } else setLoading(false);
  }, []);
  const back = useRef(null);
  const { goBack, getLastRoute, goReplace } = usePath();
  const backClicked = () => {
    if (state?.from === "editPost") goReplace("/media");
    else goBack();
    const route = getLastRoute(-2).route;
    console.log(route);
    if (route === "/") {
      dispatch(setMainLoading("mediaToHome", true));
    }
  };

  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [sureAlert, setSureAlert] = useState(false);
  const [l, setL] = useState(false);
  const handleDeletePost = async () => {
    await setSureAlert(false);
    await setL(true);
    dispatch(clearErrMsg());
    try {
      const data = await postService.deleteSinglePost(token);
      handleApiErrors(data)
        .then(({ result, alert }) => {
          if (alert.has === 1) {
            dispatch(
              setAlert({
                show: true,
                mode: "successDeletePost",
                title: alert.title,
                msg: alert.message,
                has: alert.has,
              })
            );
          }
        })
        .catch((e) => {
          dispatch(
            setAlert({
              show: true,
              mode: "errorDeletePost",
              title: e.title,
              msg: e.message,
              has: e.has,
            })
          );
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
    await setL(false);
  };

  // if (loading) return <PostLoading />;
  if (mainLoading.on) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <>
      <Helmet>
        <title>{post?.title}</title>
        <meta
          name="description"
          content={post?.text
            .replace(/<\/?[^>]+(>|$)/g, "")
            .split(".")
            .slice(0, 2)
            .join(".")}
        ></meta>
        <meta name="keywords" content={post?.title}></meta>
      </Helmet>
      {sureAlert ? (
        <AreYouSure
          Icon={Delete}
          open={sureAlert}
          setOpen={setSureAlert}
          click={handleDeletePost}
          mode="delete"
        />
      ) : null}
      {l ? <ModalConnection /> : null}

      {notifAlert.mode === "successDeletePost" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
          go={() => history.replace("/media")}
        />
      ) : null}

      {notifAlert.mode === "addReportComment" ||
      notifAlert.mode === "errorDeletePost" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}

      <nav
        style={{
          width: "100%",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
        }}
        className={`toolbarBackground customToolbar fixed top-0 text-black font-bold flex justify-center`}
      >
        <div
          className={`absolute right-4 cursor-pointer`}
          ref={back}
          onClick={backClicked}
        >
          <ChevronRightIcon />
        </div>
        <h2 className={`text-center`}>خبر</h2>
      </nav>
      {!loading ? (
        <div className="overflow-x-hidden" style={{ marginTop: 42 }}>
          <Link
            to={{
              pathname: `/profile/${post?.account?.token}`,
              state: {
                from: "post",
                token: token,
                prevScroll: window.pageYOffset,
                lastPosition: state?.lastPosition,
              },
            }}
            className={` cursor-pointer mt-2 mb-2 mr-2 text-xs flex items-center`}
          >
            <ErrorImages
              src={post?.account?.image}
              person
              width={38}
              height={38}
              sizeIcon="2.9rem"
            />
            <div style={{ marginRight: 10, fontWeight: 600 }}>
              {post?.account?.name ?? guestName}
            </div>
          </Link>

          {post?.slides?.length > 1 ? (
            <Slider slides={post?.slides} title={post?.title} post />
          ) : post?.slides?.length === 1 ? (
            <div style={{ position: "relative" }}>
              <img
                src={post?.slides[0]?.url}
                alt=""
                style={{
                  width: "100%",
                }}
              />
              <div
                className=""
                style={{
                  width: "100%",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                  display: "flex",
                  height: "100%",
                }}
              />
            </div>
          ) : null}

          {post?.audio ? <Audio url={post?.audio} /> : null}
          <PostContent post={post} />

          {/*
          <PostTime
            classes={`text-md text-left px-5  mt-4 ml-3`}
            time={post?.datetime}
          />
          */}

          <div
            className={`flex justify-between items-center px-4 py-4 border-b border-gray-400`}
          >
            {/*
            <h3>این مطلب برای شما مفید بود؟</h3>
            */}
            <PostTime classes={`text-md text-right`} time={post?.datetime} />
            <Like likeMe={post?.likeMe} like={post?.like} token={post?.token} />
          </div>
          {post?.hasComment === 1 ? (
            <CommentForm token={post?.token} />
          ) : (
            <Msg>نوشتن نظر برای شما در این مطلب محافظت می شود.</Msg>
          )}
          {post?.isMe === 1 ? (
            <DeleteIcon
              style={{ bottom: 65 }}
              onClick={() => setSureAlert((prev) => !prev)}
            />
          ) : null}
          {post?.isMe === 1 ? (
            <AddIcon Icon={EditIcon} to={`/media/compose/${post?.token}`} />
          ) : null}
          {post?.showComments === 1 ? <CommentList /> : null}
        </div>
      ) : (
        <PostLoading />
      )}
    </>
  );
};

const Msg = styled.p`
  width: 100%;
  font-size: 0.8rem;
  height: 80px;
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

// const mapostateToProps = (state) => {
//   return {
//     post: state.post.post,
//     comments: state.post.comments,
//     loading: state.post.loading,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLoadingPost: () => dispatch(setLoadingPost()),
//     getPost: (token) => dispatch(getPost(token)),
//     getComments: (token) => dispatch(getComments(token)),
//   };
// };

export default Post;
