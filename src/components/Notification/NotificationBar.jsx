/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonBase } from "@material-ui/core";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import SlideTempMenuLoader from "components/SlideTemp/SlideTempMenuLoader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotificationBar = () => {
  const { bar, loading } = useSelector(({ notification }) => notification);
  const [bars, setBars] = useState([]);
  useEffect(() => {
    if (!loading) {
      setBars([
        { name: "همه", count: bar.all_count, link: "" },
        { name: "دیدگاه ها", count: bar.comments_count, link: "/comments" },
        { name: "لایک ها", count: bar.likes_count, link: "/likes" },
        { name: "فالو ها", count: bar.follows_count, link: "/follows" },
      ]);
    }
  }, [loading, bar]);
  if (loading) return <SlideTempMenuLoader />;
  return (
    <Container>
      {bars?.map((item) => (
        <Item
          key={item.name}
          exact
          to={`/notifications${item.link}`}
          activeStyle={{ background: "#f5f5f5" }}
          replace
        >
          <ButtonBase color="gray" className="rippleItemName" radius={0}>
            <div className="barName">{item.name}</div>
          </ButtonBase>
          {item.count > 0 ? <Count>{item.count}</Count> : null}
        </Item>
      ))}
    </Container>
  );
};

const Count = styled.span`
  background: #f15959;
  border-radius: 5px;
  padding: 5px 8px;
  color: white;
  position: absolute;
  top: -16px;
  height: 26px;
  line-height: 20px;
  /* z-index: 2147483647; */
`;

const Container = styled(Scroll)`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 48px;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  overflow-x: auto;
  font-size: 14px;
  /* margin-top: 0px; */
  margin-right: 10px;
  z-index: 99999;
  height: 75px;
  align-items: flex-end;
  padding-bottom: 10px;
  margin-left: 10px;
  padding-left: 5px;
  margin-bottom: 15px;
  @media (min-width: 405px) {
    justify-content: center;
  }
`;
const Item = styled(NavLink)`
  background: white;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  white-space: nowrap;
  font-weight: 600;
  box-shadow: 0 4px 6px 0px #ccc;
  display: flex;
  flex-direction: column-reverse;
  width: 79px;
  align-items: center;
  position: relative;
  height: 39px;
  position: relative;
  line-height: 30px;
  /* border: 1px solid #eee; */
  min-width: 81px;
  &:hover {
    background-color: #f5f5f5;
  }
  & .rippleItemName {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    font-weight: bold;
    color: #5f5f5f;
  }
  & .barName {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
  }
`;
export default NotificationBar;
