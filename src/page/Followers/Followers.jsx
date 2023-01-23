/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  setFollowers,
  setAccountPage,
  setFollows,
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

const Followers = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const [ld, setLoading] = useState(false);
  const [f, setF] = useInfiniteScroll();
  const { followers, followAccount, account } = useSelector(
    ({ account }) => account
  );

  const getFollowers = async () => {
    await setLoading(true);
    await dispatch(setFollowers(token));
    await setLoading(false);
  };

  useEffect(() => {
    getFollowers();
    return () => {
      dispatch(setFollows([]));
      dispatch(setAccountPage(0));
    };
  }, []);

  const getData = async () => {
    await setLoading(true);
    await dispatch(setFollowers(token));
    await setF(false);
    await setLoading(false);
  };

  useEffect(() => {
    if (f) getData();
  }, [f]);
  const [flwrs, setFollowrs] = useState([]);
  useEffect(() => {
    if (followers && followers instanceof Object) {
      const values = Object.values(followers);
      setFollowrs(values);
    } else {
      setFollowrs(followers);
    }
  }, [followers]);
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
          دنبال کنندگان {followAccount.name ?? guestName} - اپلیکیشن شهری میرسه
        </title>
      </Helmet>
      {ld ? <LodingDotPlus isRelative={false} isFixed isBg={false} /> : null}
      {flwrs?.length > 0 ? (
        flwrs?.map((item) => (
          <Item
            key={~~(Math.random() * 999999999999999)}
            onClick={() => history.push(`/profile/${item.token}`)}
          >
            <ImgContainer>
              <ErrorImages src={item?.image} person width={55} height={55} />
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

export default Followers;
