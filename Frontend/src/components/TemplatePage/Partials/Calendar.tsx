import { Calendar } from 'react-calendar';
import { getSprintDates } from './utils'; // Assuming the function above is saved here

const CalendarComponent = (props) => {
  const { setDate, date, selectRange, sprint } = props;
  const sprintDates = getSprintDates(sprint);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && sprintDates.some(d => d.toDateString() === date.toDateString())) {
      return 'highlight';
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        selectRange={selectRange}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarComponent;
