import { useEffect, useRef, useState, createRef } from "react";
import Month from "./Month";
import classes from "./Months.module.css";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setMonth } from "store/actions/calendarActions";
import getFullYear from "utilities/getFullYear";
import styled from "styled-components";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import monthList from "utilities/monthList";

const Months = ({ gradient }) => {
  const ref = useRef([]);
  const currentMonth = useState(
    new Date()
      .toLocaleDateString("fa-IR", { month: "numeric" })
      .replace(/([۰-۹])/g, (token) =>
        String.fromCharCode(token.charCodeAt(0) - 1728)
      )
  )[0];
  useEffect(() => {
    checkCurrentMonth(ref.current);
    // window.addEventListener("resize", () => {
    //   checkCurrentMonth(ref.current);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkCurrentMonth = (ref) => {
    ref.forEach((r) => {
      if (r?.current?.dataset?.id === currentMonth) {
        r.current.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    });
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const handleMonthClick = (index) => {
    dispatch(setMonth(index + 1));
    const fy = getFullYear();
    fy.month = index + 1;
    history.push("/events", fy);
  };
  return (
    <Container
      className={`${classes.Direction} overflow-auto whitespace-nowrap border-b  `}
      style={{ borderColor: "#eaeaea" }}
    >
      {monthList &&
        monthList?.map((mnt, i, months) => {
          ref.current = months.map((_, i) => ref.current[i] ?? createRef());
          return (
            <Month
              monthName={mnt.month}
              handleClick={() => handleMonthClick(i)}
              gradient={gradient[i + 1]}
              key={i}
              data-id={mnt.id}
              ref={ref.current[i]}
            />
          );
        })}
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    gradient: state.calendar.gradient,
  };
};
const Container = styled(Scroll)`
  height: 70px;
  display: grid;
  direction: rtl;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 429px) {
    & > div {
      width: 130px !important;
    }
  }
`;
export default connect(mapStateToProps)(Months);
