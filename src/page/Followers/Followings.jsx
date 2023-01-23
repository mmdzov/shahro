/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  setFollowing,
  setFollowings,
  setAccountPage,
  setFollowAccount,
} from "store/actions/accountAction";
import {
  Followers as Container,
  ImgContainer,
  CenterItem,
} from "./Follows.styled";
import { Item } from "../../components/Notification/Notification.styled";
import ErrorImages from "components/Utilities/ErrorImages";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { Helmet } from "react-helmet";
import EmptyBasket from "components/Basket/EmptyBasket";

const Followings = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const [ld, setLoading] = useState(true);
  const [f, setF] = useInfiniteScroll();
  const { followings, followAccount, account } = useSelector(
    ({ account }) => account
  );

  const getFollowings = async () => {
    await setLoading(true);
    await dispatch(setFollowings(token));
    await setLoading(false);
  };

  useEffect(() => {
    getFollowings();
    return () => {
      dispatch(setFollowing([]));
      dispatch(setAccountPage(0));
    };
  }, []);

  const getData = async () => {
    await setLoading(true);
    await dispatch(setFollowings(token));
    await setF(false);
    await setLoading(false);
  };

  useEffect(() => {
    if (f) getData();
  }, [f]);
  const [flwngs, setFollwings] = useState([]);
  useEffect(() => {
    if (followings && followings instanceof Object) {
      const values = Object.values(followings);
      setFollwings(values);
    } else {
      setFollwings(followings);
    }
  }, [followings]);
  useEffect(() => {
    return () => {
      dispatch(setFollowAccount());
    };
  }, []);
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);

  return (
    <Container>
      <Helmet>
        <title>
          دنبال شوندگان {followAccount.name ?? guestName} - اپلیکیشن شهری میرسه
        </title>
      </Helmet>
      {ld ? <LodingDotPlus isRelative={false} isFixed isBg={false} /> : null}
      {flwngs?.length > 0 ? (
        flwngs?.map((item) => (
          <Item
            key={~~(Math.random() * 999999999999999)}
            onClick={() => history.push(`/profile/${item.token}`)}
          >
            <ImgContainer>
              <ErrorImages src={item?.image} width={55} height={55} person />
            </ImgContainer>
            <CenterItem isUser={item?.username}>
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>
                {item?.name ?? guestName}
              </span>
              {item.username ? (
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>
                  {item?.username}
                </span>
              ) : null}
            </CenterItem>
          </Item>
        ))
      ) : !ld ? (
        <EmptyBasket
          title=" "
          msg={`دنبال کننده ای ${
            followAccount?.token === account.token ? "ندارید" : "ندارد"
          }`}
          Icon={"Error"}
        />
      ) : null}
    </Container>
  );
};

export default Followings;
