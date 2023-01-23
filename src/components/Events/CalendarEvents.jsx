import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { useSelector } from "react-redux";
import monthColors from "../../utilities/monthColors";
import { CalendarContainer } from "./Events.styled";
import "./events.css";

const CalendarEvents = ({ handleChange }) => {
  const { index: month, date } = useSelector(({ calendar }) => calendar);

  return (
    <CalendarContainer color={monthColors[month - 1]}>
      <Calendar
        value={date}
        locale="fa"
        onChange={handleChange}
        calendarClassName="responsive-calendar"
        shouldHighlightWeekends
      />
    </CalendarContainer>
  );
};

export default CalendarEvents;
