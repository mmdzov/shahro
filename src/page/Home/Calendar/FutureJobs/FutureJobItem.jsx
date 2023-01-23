import JobContent from "./JobContent";
import Time from "./Time";
import { useHistory } from "react-router";
import styled from "styled-components";
import toPersian from "utilities/ToPersian";
import CalendarIcon from "components/Events/CalendarIcon";
const FutureJob = ({ event, month, gradient, day, year, token }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/events/${year}/${month}/${day}`, {
      token,
      month,
      day,
      year,
    });
  };
  return (
    <Item style={{ borderColor: "#eaeaea" }} onClick={handleClick}>
      <CalendarIcon day={day} month={month} />
      <JobContent
        date={toPersian(event.date + "")}
        title={toPersian(event.title + "")}
      />
      <Time gradient={gradient[month]} time={toPersian(event.time)} />
    </Item>
  );
};

const Item = styled.div`
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  margin-top: 9px;
  cursor: pointer;

  &:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }
`;

export default FutureJob;
