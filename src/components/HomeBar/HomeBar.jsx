import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import SlideTempMenuLoader from "components/SlideTemp/SlideTempMenuLoader";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HomeBar = () => {
  const [bars] = useState([
    { name: "فاکتور ها", link: "/invoices" },
    { name: "سبد خرید", link: "/store/basket" },
    { name: "کیف پول", link: "/wallet" },
    { name: "خرید شارژ", link: "/buy-credit" },
    { name: "پرداخت قبض", link: "/bill" },
  ]);
  const { loading } = useSelector(({ account }) => account);
  if (loading) return <SlideTempMenuLoader />;
  return (
    <HomeBarWrapper>
      {bars.map(({ name, link }) => (
        <HomeBarItem
          to={link}
          key={~~(Math.random() * 9999999)}
          activeStyle={{
            color: "white",
            backgroundColor: "#313640",
            border: "1px solid #313640",
          }}
        >
          {name}
        </HomeBarItem>
      ))}
    </HomeBarWrapper>
  );
};

const HomeBarWrapper = styled(Scroll)`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  overflow-x: auto;
  padding: 5px 15px;
  font-size: 14px;
  padding-bottom: 15px;
  margin-top: 10px;
  direction: ltr;
  padding-right: 5px;
`;
const HomeBarItem = styled(NavLink)`
  padding: 7px 10px;
  background: white;
  color: black;
  border-radius: 11px;
  cursor: pointer;
  margin-right: 10px;
  border: 1px solid #232323;
  white-space: nowrap;
  font-weight: 600;
`;
export default HomeBar;
