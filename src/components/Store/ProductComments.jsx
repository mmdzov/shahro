/* eslint-disable react-hooks/exhaustive-deps */
import {
  ProdCommentHeader,
  ProdFavs,
  ProdFavsTitle,
  ProdNotComment,
  ProdParent,
  ProdSeeMore,
} from "./Product.styled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useForceUpdate from "hooks/useForceUpdate";
import { useHistory, useParams } from "react-router";
import toFaDecimal from "utilities/toFaDecimal";
import ReportTemplate from "./ReportTemplate";
import useLoading from "hooks/useLoading";
import CommentLoading from "components/SlideTemp/CommentLoading";
import { reportProduct } from "store/actions/productAction";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import ReportTemp from "components/Utilities/ReportTemp";
import averageColor from "utilities/averageColor";
import { ListItemContainer } from "components/SlideTemp/SlideTemp.styled";
import ErrorImages from "components/Utilities/ErrorImages";
import AuthAlert from "components/Utilities/AuthAlert";
import { clearAlert } from "store/actions/_MainAction";
import { ButtonBase } from "@material-ui/core";
import SlideTempList from "components/SlideTemp/SlideTempList";

const ProductComments = ({ setModal }) => {
  const forceUpdate = useForceUpdate();
  const [rep, setRep] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const [ldi, setLoading] = useState(false);
  const {
    single: { product: prod },
  } = useSelector(({ product }) => product);
  // const [limitedComment, setLimitComment] = useState([]);
  const { alert, guestName } = useSelector(({ _MainReducer }) => _MainReducer);
  const handleReport = () => {
    setRep((prev) => !prev);
  };
  const handleSubmit = async (state) => {
    await setLoading(true);
    const {
      title: { text: title },
      description: { text: descr },
    } = state;
    await dispatch(reportProduct({ product: token, title, text: descr }));
    await setLoading(false);
    setRep(false);
  };
  useEffect(() => {
    forceUpdate();
    // const trim = prod?.comments.slice(0, 5);
    // const trim = prod?.comments;
    // setLimitComment(trim);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);
  useEffect(() => {
    setModal(rep);
  }, [rep]);
  const { loading } = useLoading(prod);
  return (
    <ProdParent
      style={{
        height: loading ? 300 : "auto",
        cursor: !loading && prod?.comments?.length === 0 ? "pointer" : "unset",
      }}
    >
      {ldi ? <ModalConnection /> : null}
      {rep ? (
        <ReportTemplate
          onCancel={() => setRep(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
      <div className="">
        {!rep && !ldi && alert.mode === "reportProduct" && (
          <AuthAlert
            alert={{ title: alert?.title, message: alert?.msg }}
            go={() => dispatch(clearAlert())}
          />
        )}
        <ProdCommentHeader
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/store/comments/${token}`)}
        >
          <span style={{ fontSize: 18 }}>نظرات کاربران</span>
          {!loading ? (
            <ProdSeeMore>
              <span style={{ marginLeft: 2, cursor: "pointer" }}>
                مشاهده همه
              </span>
              <ArrowBackIosIcon style={{ fontSize: 12, color: "#6b6b6b" }} />
            </ProdSeeMore>
          ) : null}
        </ProdCommentHeader>
        {!loading ? (
          prod?.comments?.length > 0 ? (
            <CommentWrapper>
              <CommentSubWrapper>
                <SlideTempContainer showBtn={false}>
                  {prod?.comments?.map((item) => (
                    <Item>
                      <CommentContainer key={item.token}>
                        <CommentHeader>
                          <CommentTitle>{item.title}</CommentTitle>
                          {/* <CommentDate>2 ماه پیش</CommentDate> */}
                          <CommentText>{item.text}</CommentText>
                        </CommentHeader>
                        <CommentBtm>
                          <CommentImgContainer
                            onClick={() =>
                              history.push(`/profile/${item.account.token}`)
                            }
                          >
                            <ErrorImages
                              person
                              src={item.account.image}
                              width={35}
                              height={35}
                              sizeIcon="2.5rem"
                            />
                            <CommentAuthor style={{ marginRight: 10 }}>
                              {item.account.name || guestName}
                            </CommentAuthor>
                          </CommentImgContainer>
                          <CommentAverage bg={averageColor(item.average)}>
                            {toFaDecimal(item.average)}
                          </CommentAverage>
                        </CommentBtm>
                      </CommentContainer>
                    </Item>
                  ))}
                </SlideTempContainer>
              </CommentSubWrapper>
            </CommentWrapper>
          ) : (
            <div className="">
              <ProdNotComment
                onClick={
                  !loading && prod?.comments?.length === 0
                    ? () => history.push(`/store/comments/${token}`)
                    : null
                }
              >
                درحال حاظر نظری برای این محصول موجود نمی باشد. شما اولین نفر
                باشید!
              </ProdNotComment>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: ".9rem",
                }}
              >
                <ButtonBase
                  onClick={() => history.push(`/store/comments/add/${token}`)}
                >
                  <div
                    className="primary"
                    style={{ padding: "5px 15px", borderRadius: "100px" }}
                  >
                    افزودن نظر
                  </div>
                </ButtonBase>
              </div>
            </div>
          )
        ) : (
          <CommentLoading />
        )}
        {!loading && prod?.recommendCount && prod?.recommendCount !== 0 ? (
          <ProdFavs>
            <LoyaltyIcon style={{ color: "rgb(8 175 8)" }} />
            <ProdFavsTitle>
              بیش از <span>{prod.recommendCount.toLocaleString("fa-IR")}</span>{" "}
              نفر این محصول رو پیشنهاد کردند!
            </ProdFavsTitle>
          </ProdFavs>
        ) : null}
      </div>
      {!loading ? <ReportTemp onReport={handleReport} /> : null}
    </ProdParent>
  );
};
const Item = styled(ListItemContainer)`
  &:last-of-type {
    margin-left: 0 !important;
    border-left: 2px solid transparent !important;
  }
`;

const CommentAuthor = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-top: 3px;
`;
const CommentAverage = styled.div`
  padding: 2px 9px;
  background: ${({ bg }) => bg};
  /* background: #0eca47; */
  color: white;
  border-radius: 9px;
  font-size: 14px;
`;
const CommentImgContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SlideTempContainer = styled(SlideTempList)`
  & > .flickity-slider {
    width: 250px !important;
  }
`;

const CommentSubWrapper = styled.div`
  & > .flickity-slider {
    display: flex;
    margin-right: 10px;
    margin-bottom: 10px;
    /* width: 250px !important; */
    & > div {
      width: 100%;
    }
  }
`;
const CommentWrapper = styled.div`
  /* display: flex;
  overflow-x: auto;
  overflow-y: hidden; */
`;
const CommentHeader = styled.div`
  padding-top: 8px;
  font-size: 15px;
`;
// const Comment;
const CommentBtm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  height: 45px;
`;

const CommentText = styled.div`
  margin-top: 5px;
  margin-right: 5px;
  font-size: 14px;
`;

const CommentTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
`;
const CommentContainer = styled.div`
  width: 240px !important;
  padding: 0 10px;
  height: 165px;
  margin-left: 7px;
  display: grid;
  grid-template-rows: 2fr 1fr;
  border-radius: 4px;
  box-shadow: 0px 4px 6px -3px #b5b5b5;
  border: 1px solid #eee;
`;

export default ProductComments;
