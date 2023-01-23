/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import FutureJobItem from "./FutureJobItem";
import { useSelector } from "react-redux";
import FutureJobLoading from "../../../../components/Utilities/Loadings/FutureJobLoading";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import getFullYear from "utilities/getFullYear";
import monthList from "utilities/monthList";
import { useState } from "react";
import toPersian from "utilities/ToPersian";
import PlusBtn from "./PlusBtn";

const FutureJobsList = () => {
  const { homeCalendar, gradient, loading } = useSelector(
    ({ calendar }) => calendar
  );
  const history = useHistory();
  const [month, setMonth] = useState("");
  useEffect(() => {
    const date = new Date();
    const day = date.toString().split(" ")[0].toLowerCase();
    if (day === "sat") setMonth("شنبه");
    else if (day === "sun") setMonth("یکشنبه");
    else if (day === "mon") setMonth("دوشنبه");
    else if (day === "tue") setMonth("سه شنبه");
    else if (day === "wed") setMonth("چهارشنبه");
    else if (day === "thu") setMonth("پنجشنبه");
    else if (day === "fri") setMonth("جمعه");
  }, []);
  if (loading) return <FutureJobLoading />;
  return (
    <div
      style={{
        margin: homeCalendar.length > 0 ? 0 : "10px 0px",
        padding: homeCalendar.length > 0 ? 10 : "0px 10px",
        paddingBottom: homeCalendar.length > 0 ? "3px" : "0px",
        paddingTop: homeCalendar.length > 0 ? "5px" : "0px",
      }}
    >
      {homeCalendar?.length > 0 ? (
        <Fragment>
          {/* <h1 className={`font-bold text-lg my-4 `}>کار های آینده</h1> */}
          {homeCalendar.map((event) => (
            <FutureJobItem
              key={event.token}
              month={event.month}
              event={event}
              gradient={gradient}
              {...event}
            />
          ))}
        </Fragment>
      ) : (
        <AddContainer
          onClick={() => history.push("/events", { ...getFullYear() })}
        >
          <AddRight>
            <AddIcon>
              <PlusBtn gradient={gradient[getFullYear()?.month]} />
            </AddIcon>
            <AddText>
              {month} {toPersian(getFullYear()?.day)}{" "}
              {toPersian(monthList[getFullYear()?.month - 1].month + "")}
            </AddText>
          </AddRight>
          <AddLeft>برنامه ریزی کن!</AddLeft>
        </AddContainer>
      )}
    </div>
  );
};

const AddContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  cursor: pointer;
  grid-gap: 5px;
`;
const AddRight = styled.div`
  display: flex;
  align-items: center;
`;

const AddIcon = styled.div`
  & > svg {
    font-size: 2.7rem;
    color: #0886e0;
  }
`;

const AddText = styled.div`
  margin-right: 4px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const AddLeft = styled.div`
  text-align: left;
  font-size: 0.7rem;
  font-weight: 600;
  color: #0886e0;
`;

export default FutureJobsList;
