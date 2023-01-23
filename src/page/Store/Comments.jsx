import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  getComments,
  reportComment,
  setLikeComment,
} from "store/actions/productAction";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import toFaDecimal from "utilities/toFaDecimal";
import ReportTemplate from "components/Store/ReportTemplate";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { ProdNotComment } from "components/Store/Product.styled";
import averageColor from "utilities/averageColor";
import {
  AddComment,
  CmBtnLike,
  CmBtnReport,
  CmContent,
  CmText,
  CmTitle,
  CommentContainer,
  CommentRate,
  CommentTitle,
  RateItemName,
  RateItemRange,
  RateItemRangeContainer,
  RateTitle,
  RateContainer,
  RateList,
  RateItem,
  CmHeader,
  CmBtns,
  CommentItem,
  CommentList,
} from "./Comments.styled";
import ErrorImages from "components/Utilities/ErrorImages";
import useLoading from "hooks/useLoading";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import AuthAlert from "components/Utilities/AuthAlert";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import textLimit from "utilities/textLimit";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import toPersian from "utilities/ToPersian";

const Comments = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});
  const [l, setL] = useState(false);
  const history = useHistory();
  const {
    comments: { charts, comments },
  } = useSelector(({ product }) => product);
  const { alert: notifAlert, guestName } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const { loading } = useLoading(comments);
  useEffect(() => {
    document.body.classList.add("bodyGray");
    dispatch(getComments(token));
    return () => document.body.classList.remove("bodyGray");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLikeComment = async (t) => {
    // await setL(true);
    await dispatch(
      setLikeComment({
        product: token,
        comment: t.token,
        value: t.likeMe === 1 ? 0 : 1,
      })
    );
    // await setL(false);
  };
  const handleReportComment = (t) => {
    setData(t);
    setModal(true);
  };
  const handleSubmit = async (state) => {
    await setL(true);
    await dispatch(
      reportComment({
        product: token,
        comment: data?.token,
        title: state?.title?.text,
        text: state?.description?.text,
      }),
      setModal(false)
    );
    await setL(false);
  };
  const [width, setWidth] = useState(window.innerWidth);
  function getWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", () => getWidth());
    // eslint-disable-nexdt-line react-hooks/exhaustive-deps
  }, []);
  const [size, setSize] = useState("");
  useEffect(() => {
    let d = 0;
    const division = width / 100;
    if (width < 240) d = division * 8;
    else if (width < 274) d = division * 9;
    else if (width < 299) d = division * 10;
    else if (width < 327) d = division * 10.5;
    else if (width < 349) d = division * 11.5;
    else if (width < 388) d = division * 11.6;
    else if (width < 425) d = division * 12.3;
    else if (width < 450) d = division * 12;
    else if (width < 510) d = division * 12.4;
    else if (width < 667) d = division * 12.7;
    else if (width < 789) d = division * 14.5;
    else if (width > 789) d = division * 15;

    setSize(~~d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  const getDividedByFive = (width, y) => (width / 5) * y;
  if (loading) return <LodingDotPlus isRelative={false} />;
  return (
    <CommentContainer>
      {l ? <ModalConnection /> : null}
      {modal ? (
        <ReportTemplate
          onCancel={() => setModal(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
      {notifAlert.mode === "reportComment" ||
      notifAlert.mode === "commentLike" ? (
        <AuthAlert
          alert={{
            title: notifAlert?.title || " ",
            message: notifAlert?.msg || " ",
          }}
        />
      ) : null}
      <RateContainer className="rateContainer">
        <RateTitle>امتیاز کلی</RateTitle>
        <RateList>
          {charts?.map((item, i) => (
            <RateItem key={i}>
              <RateItemName>{item.name}</RateItemName>
              <RateItemRangeContainer className="rateItemRangeContainer">
                <RateItemRange
                  w={`${getDividedByFive(190, ~~item.value)}px`}
                  className="rateItemRange"
                />
              </RateItemRangeContainer>
            </RateItem>
          ))}
        </RateList>
      </RateContainer>
      <CommentList>
        {comments?.length > 0 ? (
          comments?.map((item) => {
            return (
              <CommentItem key={item.token} className="commentItem">
                <CmHeader>
                  <div style={{ paddingLeft: "5px" }}>
                    <CmTitle className="commentTitleDot">
                      <CommentTitle className={`commentItem_${item?.token}`}>
                        {textLimit(item?.title, size)}
                      </CommentTitle>
                      <div>{toPersian(item.datetime)}</div>
                    </CmTitle>
                  </div>
                  <CommentRate bg={averageColor(item.average)}>
                    {toFaDecimal(item.average)}
                  </CommentRate>
                </CmHeader>
                <CmContent
                  style={{ cursor: "pointer", width: "max-content" }}
                  onClick={() => history.push(`/profile/${item.account.token}`)}
                >
                  <ErrorImages
                    height={35}
                    width={35}
                    src={item?.account?.image}
                    border="1px solid #eee"
                    marginLeft="8px"
                    sizeIcon={"1rem"}
                  />
                  <span>
                    {!item.account.name ? guestName : item.account.name}
                  </span>
                </CmContent>
                <CmText>{item.text}</CmText>
                <CmBtns>
                  <CmBtnLike>
                    <div
                      style={{ color: item.likeMe === 1 ? "#06b706" : "gray" }}
                      onClick={() =>
                        handleLikeComment({
                          likeMe: item.likeMe,
                          token: item.token,
                        })
                      }
                    >
                      {/* <ThumbUpAltIcon /> */}
                      {item.likeMe === 1 ? (
                        <FavoriteIcon style={{ color: "#ef4444" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </div>
                    {item?.like > 0 ? (
                      <span>{item.like.toLocaleString("fa-IR")}</span>
                    ) : null}
                  </CmBtnLike>
                  <CmBtnReport onClick={() => handleReportComment(item)}>
                    <FlagOutlinedIcon />
                  </CmBtnReport>
                </CmBtns>
              </CommentItem>
            );
          })
        ) : (
          <ProdNotComment style={{ textAlign: "center" }}>
            درحال حاظر نظری موجود نمی باشد. شما اولین نفر باشید!
          </ProdNotComment>
        )}
      </CommentList>
      <AddComment
        className="addCommentBtn"
        onClick={() => history.push(`/store/comments/add/${token}`)}
      >
        <div>
          <AddCommentIcon />
        </div>
        <div>ثبت نظر</div>
      </AddComment>
    </CommentContainer>
  );
};
export default Comments;
