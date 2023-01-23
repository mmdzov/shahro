import styled from "styled-components";

export const CalendarContainer = styled.div`
  padding: 0;
  justify-content: center;
  display: flex;
  .Calendar {
    background-color: transparent;
    box-shadow: unset;
    max-width: unset;
    padding-top: 0;
  }
  .Calendar__header {
    padding: 2.5em 2.9em 2em;
  }
  .responsive-calendar {
    font-size: 8px !important;
  }
  .Calendar__sectionWrapper {
    /* min-height: 22.5em; */
  }
  .Calendar__day {
    color: #fff;
  }
  .Calendar__day.-selected,
  .Calendar__day.-selectedStart,
  .Calendar__day.-selectedEnd {
    background: whitesmoke !important;
    color: black !important;
  }
  .Calendar__monthSelectorItemText,
  .Calendar__yearSelectorText {
    color: black;
  }
  .Calendar__header {
    filter: invert(96%) sepia(97%) saturate(12%) hue-rotate(237deg)
      brightness(103%) contrast(103%);
  }
  .Calendar__monthSelectorItem.-active .Calendar__monthSelectorItemText,
  .Calendar__yearSelectorItem.-active .Calendar__yearSelectorText {
    background-color: ${({ color }) => color} !important;
  }
  .Calendar__day.-rtl.-selected,
  .Calendar__day:not(.-blank):not(.-selectedStart):not(.-selectedEnd):not(.-selectedBetween):not(.-selected):hover {
    background: transparent !important;
    border: 1px solid white;
    color: white !important;
    transition: all 0.2s ease-in;
  }
  .Calendar__day.-rtl.-selected {
    border: 1px solid white;
    background: white !important;
    color: black !important;
  }
`;
export const Container = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-right: 25px;
  height: 60px;
  &:first-of-type {
    height: 85px !important;
    margin-bottom: -2px !important;
    &::after {
      content: "";
      position: absolute;
      height: 65%;
      border-right: 3px dashed #ccc;
      top: -19px;
      right: 25px;
    }
  }
  position: relative;
  padding: 0 20px;
  padding-top: ${({ dayWeekNameExist }) =>
    dayWeekNameExist ? "10px" : "5px"} !important;
  padding-bottom: 0px !important;
  .circle {
    width: 14px;
    height: 14px;
    right: 3px;
    top: 50%;
    transform: translateY(-50%) translateX(35%);
    position: absolute;
    background-color: #ff6d6e;
    z-index: 1;
    border-radius: 50%;
  }
  &::after {
    content: "";
    position: absolute;
    height: 50%;
    border-right: 3px dashed #ccc;
    top: 0;
    right: 25px;
  }
  &::before {
    content: "";
    position: absolute;
    height: 50%;
    border-right: 3px dashed #ccc;
    bottom: 0;
    right: 25px;
  }
`;
export const Head = styled.div`
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
export const Date = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color || "#ff6d6e"};
`;
export const Des = styled.div`
  padding-right: 10px;
  font-size: 14px;
  height: 21px;
  font-weight: bold;
  color: #999;
  margin-top: -5px;
`;

export const DayName = styled.div`
  position: absolute;
  right: 0;
  top: -17px;
  font-size: 0.6rem;
  background: #0000009e;
  z-index: 9;
  color: white;
  padding: 1px 5px;
  height: 15px;
  display: flex;
  justify-content: space-between;
  & > span:last-of-type {
    padding-right: 10px;
    padding-top: 1px;
  }
`;
