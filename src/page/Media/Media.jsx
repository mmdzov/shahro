import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MediaList from "../../page/Home/Media/MediaList";
import TagList from "./TagList";
import SingleMediaList from "./SingleMediaList";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setLoadingMedia,
  getMediaData,
  setMediaData,
  getMorePosts,
} from "../../store/actions/mediaActions";
import {
  setCalLoading,
  getCalendar,
} from "../../store/actions/calendarActions";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";
import MediaOrderBottomSheet from "./MediaOrderBottomSheet";
import AuthAlert from "components/Utilities/AuthAlert";
import { setLoading } from "store/actions/_MainAction";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import usePath from "hooks/usePath";

const Media = ({
  allPosts,
  categories,
  sliders,
  setLoadingMedia,
  getMediaData,
  postPage,
  currentCategory,
  nextPage,
  loading,
}) => {
  const { posts, sliders: sldrs } = useSelector(({ media }) => media);
  const [isFetching, setIsFetching] = useInfiniteScroll();
  const history = useHistory();
  const { cats } = useParams();
  // const { setLastPosition, lastPosition } = useContext(MediaContext);
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (isFetching) {
      if (nextPage.length !== 0) {
        dispatch(getMorePosts(postPage + 1, currentCategory, history));
      }
      setIsFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, nextPage]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (allPosts === null) {
  //     setLoadingMedia();
  //     getMediaData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [allPosts]);

  // useEffect(() => {
  //   const hasMedia = pathname
  //     .split("/")
  //     .filter((item) => item)
  //     .every((item) => "media");
  //   if (hasMedia) {
  //     window.addEventListener("scroll", () => {
  //       setLastPosition(window?.pageYOffset);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const [mount, setMount] = useState(true);
  useEffect(() => {
    console.log(state);
    if (posts && sldrs) {
      if (!mount) return;
      window.scrollTo(0, state?.lastPosition || 0);
      setMount(false);
    }
  }, [state, posts, sldrs, mount]);
  useEffect(() => {
    return () => {
      console.log(window?.pageYOffset);
      dispatch(setLoading("", false));
      if (cats) {
        dispatch(setMediaData());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { goAdvanceBack, goBack } = usePath();
  const handleBackClick = () => {
    const parse = pathname.split("/");
    console.log(parse);
    if (parse.length === 3) goAdvanceBack("/media");
    else if (parse.length === 2) {
      goBack();
      dispatch(setLoading("mediaToHome", true));
    }
  };
  const { alert: notifAlert, loading: l } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  if (l.on) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <div style={{ width: "100%" }} className="overflow-hidden">
      <Helmet>
        <title>رسانه و اخبار</title>
      </Helmet>
      {notifAlert.mode === "mediaCategory" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      <nav
        style={{
          width: "100%",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
        }}
        className={`toolbarBackground customToolbar fixed top-0 text-black font-bold flex justify-center`}
      >
        <div
          className={`absolute right-4 cursor-pointer`}
          onClick={handleBackClick}
        >
          <ChevronRightIcon />
        </div>
        <h1 className={`text-center`}>رسانه</h1>
        <div
          style={{
            width: 37,
            cursor: "pointer",
            zIndex: 9,
            position: "absolute",
            left: "10px",
          }}
          onClick={() => history.push("/media/search")}
        >
          <svg
            enableBackground="new 0 0 100 100"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 100 100"
          >
            <path
              clipRule="evenodd"
              d="M64.5,44.6c0-11.6-9.4-20.9-20.9-20.9c-11.6,0-20.9,9.4-20.9,20.9  c0,11.6,9.4,20.9,20.9,20.9C55.1,65.6,64.5,56.2,64.5,44.6z M80,79.3l-1.8,1.8l-19-19c-4.2,3.7-9.6,6-15.7,6  c-13,0-23.5-10.5-23.5-23.5c0-13,10.5-23.5,23.5-23.5c13,0,23.5,10.5,23.5,23.5c0,6-2.3,11.5-6,15.7L80,79.3z"
              fill="#000000"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </nav>

      <MediaList posts={sliders} loading={loading} style={{ marginTop: 50 }} />
      <TagList tags={categories !== null ? categories : null} />
      <SingleMediaList
        isFetching={isFetching}
        loading={loading}
        posts={allPosts !== null ? allPosts : null}
      />
      <MediaOrderBottomSheet />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allPosts: state.media.posts,
    sliders: state.media.sliders,
    categories: state.media.categories,
    posts: state.calendar.posts,
    loading: state.media.loading,
    postPage: state.media.postPage,
    currentCategory: state.media.currentCategory,
    nextPage: state.media.nextPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoadingMedia: () => dispatch(setLoadingMedia()),
    getMediaData: () => dispatch(getMediaData()),
    setCalLoading: () => dispatch(setCalLoading()),
    getCalendar: () => dispatch(getCalendar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
