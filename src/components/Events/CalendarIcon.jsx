import styled from "styled-components";
import monthColors from "utilities/monthColors";
import monthList from "utilities/monthList";
import textLimit from "utilities/textLimit";
import toPersian from "utilities/ToPersian";

const CalendarIcon = ({ day, month }) => {
  return (
    <Container>
      <Header color={monthColors[month - 1]}>
        <div className="title">{textLimit(monthList[month - 1].month, 5)}</div>
      </Header>
      <Day>{toPersian(day)}</Day>
    </Container>
  );
};

const Container = styled.div`
  width: 37px;
  height: 39px;
  background: white;
  /* margin-left: 8px; */
  /* margin-bottom: 15px; */
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #eee;
`;

const Header = styled.div`
  background: ${({ color }) => color};
  color: white;
  height: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0 4px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 2px;
    width: 4px;
    height: 4px;
    background: #4a4a4a;
    border-radius: 100px;
    left: 9px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 2px;
    width: 4px;
    height: 4px;
    background: #4a4a4a;
    border-radius: 100px;
    left: 21px;
  }
  .title {
    line-height: 10px;
    font-size: 0.5rem;
    font-weight: bold;
  }
`;

const Day = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-bottom: 3px; */
`;

export default CalendarIcon;
