/* eslint-disable no-unused-vars */
import ErrorImages from "components/Utilities/ErrorImages";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Item,
  CenterItem,
  Icons,
  Icon,
  LeftItem,
  Muted,
  Follow,
} from "./Notification.styled";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import textLimit from "utilities/textLimit";
import { setError } from "store/actions/notifAction";

const Notification = () => {
  const { notification } = useSelector(({ notification }) => notification);
  const { links } = useParams();
  const [link, setLink] = useState();
  const checkFirstWord = (word) => {
    const limit = textLimit(word ?? "", 70);
    if (/^[a-z]/i.test(word)) return { limit, direction: "ltr" };
    return { limit, direction: "rtl" };
  };
  const [datas, setDatas] = useState(notification);
  useEffect(() => {
    setLink(!links ? "all" : links);
  }, [links]);
  const handleSetError = (id, error) => {
    // setError(id, error);
    const { all, likes, comments, follows } = datas;
    const concat = [...all, ...likes, ...comments, ...follows];
    const index = concat.findIndex((item) => item.id === id);
    const field = concat[index];
    field.error = error;
    const i = notification[field.type].findIndex((item) => item.id === id);
    notification[field.type][i] = field;
    setDatas(notification);
  };
  return (
    <Container>
      {datas?.[link]?.map((item) => (
        <Item key={~~(Math.random() * 9999999)}>
          <ErrorImages
            width={60}
            height={60}
            sizeIcon="3.8rem"
            src={item?.user?.image}
            token={item.id}
            isError={item.error}
            cb={handleSetError}
            person
          />

          <CenterItem>
            <span dir={checkFirstWord(item?.user?.name).direction}>
              {checkFirstWord(item?.user?.name).limit}
            </span>
            <span dir={checkFirstWord(item?.text).direction}>
              {checkFirstWord(item?.text)?.limit}
            </span>
            <Icons>
              {item?.has_like > 0 ? (
                <Icon>
                  <FavoriteBorderIcon />
                </Icon>
              ) : null}
              {item?.has_comment > 0 ? (
                <Icon>
                  <CommentIcon />
                </Icon>
              ) : null}
            </Icons>
          </CenterItem>
          <div>
            {item?.has_follow_button === 0 ? (
              <ErrorImages
                width={70}
                height={70}
                sizeIcon=".9rem"
                src={item?.image}
              />
            ) : (
              <LeftItem>
                {item?.followed > 0 ? (
                  <Muted style={{ textAlign: "right" }}>
                    <span>حذف دنبال کننده</span>
                  </Muted>
                ) : (
                  <Follow>
                    <span>دنبال کردن</span>
                  </Follow>
                )}
              </LeftItem>
            )}
          </div>
        </Item>
      ))}
    </Container>
  );
};

export default Notification;
