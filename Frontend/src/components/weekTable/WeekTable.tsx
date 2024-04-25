import { Dispatch, RefObject, SetStateAction } from "react";
import { Week } from "../createTemplate/CreateTemplate";
import CalendarEvent from "../event/CalendarEvent";

type Props = {
    weeks: Week[],
    handleAddEvent: (weekIndex: number) => void,
    CustomRef: RefObject<HTMLDialogElement>,
    setWeeks: Dispatch<SetStateAction<Week[]>>
}

function WeekTable({ weeks, handleAddEvent, CustomRef, setWeeks }: Props) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const updatedWeeks = [...weeks];
        updatedWeeks[index].number = parseInt(value);
        setWeeks(updatedWeeks)
    }
    return (
        <>
            {weeks.map((week, index) => {
                return (
                    <table className="table table-sm" key={"week_" + index}>
                        <thead>
                            <tr>
                                <th>Week</th>
                                <th><input type="number" onChange={(e) => handleInputChange(e, index)} className="input input-bordered w-full input-sm max-w-xs" placeholder="Week number" /></th>
                                <th><button className="btn btn-sm" onClick={() => handleAddEvent(index)}> + Add Event</button></th>
                            </tr>
                            <tr>
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Day</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Recurrence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {week.events.map((_, eventIndex) => <CalendarEvent key={"Week_" + index + "_Event_" + eventIndex} CustomRef={CustomRef} setWeeks={setWeeks} weeks={weeks} weekIndex={index} index={eventIndex} />)}
                        </tbody>
                    </table>
                )
            })}



        </>
    )
}

export default WeekTable