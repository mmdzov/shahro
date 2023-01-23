import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import monthColors from "utilities/monthColors";
import zeroInTimeCustom from "utilities/zeroInTimeCustom";
import { Date, Des, Head, Title, Container, DayName } from "./Events.styled";

function ItemEvent({ children, data, id, handleClick = () => {}, ...props }) {
  let { title, description: des, hours, minutes, day, dayWeekName } = data;
  const { index } = useSelector(({ calendar }) => calendar);
  const [t, setT] = useState("");
  const rf = useRef(null);
  useEffect(() => {
    console.log(data);
    let to12 = hours % 12;
    const zitH = zeroInTimeCustom(to12);
    const zitM = zeroInTimeCustom(minutes);
    setT(`${zitH}:${zitM}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleClickEv = (e, id) => {
    handleClick(e, id);
  };
  return (
    <Container
      id={`b${data.token}`}
      className="evItem"
      {...props}
      style={{ cursor: "pointer" }}
      ref={rf}
      onClick={(e, b) => handleClickEv(e, id)}
      dayWeekNameExist={dayWeekName}
    >
      <Head>
        <div
          className="circle"
          style={{ background: data.isOld === 0 ? "#ff6d6e" : "black" }}
        ></div>
        {dayWeekName ? (
          <DayName className="">
            <span>{dayWeekName}</span>
            <span>{day}</span>
          </DayName>
        ) : null}
        <Title>{title ? title : "بدون عنوان"}</Title>
        <Date color={monthColors[index - 1]}>{t}</Date>
      </Head>
      <Des>{des}</Des>
    </Container>
  );
}

export default ItemEvent;
