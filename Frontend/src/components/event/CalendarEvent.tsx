import { Dispatch, RefObject, SetStateAction, useRef } from "react"
import { Week } from "../createTemplate/CreateTemplate"

type Props = {
    CustomRef: RefObject<HTMLDialogElement>
    setWeeks: Dispatch<SetStateAction<Week[]>>
    index: number
    weekIndex: number
    weeks: Week[],

}

export type CalendarEvent = {
    name: string,
    description: string,
    day: number,
    startTime: string,
    endTime: string,
    recurrence?: string
}

export type GoogleEvent = {
    summary: string,
    description?: string,
    start: {
        dateTime: string,
        timeZone: string
    },
    end: {
        dateTime: string,
        timeZone: string
    },
    recurrence?: string[],
    extendedProperties: {
        shared: {
            template: string
        }
    }
}

function CalendarEvent({ CustomRef, setWeeks, index, weekIndex, weeks }: Props) {

    const selectRef = useRef<HTMLSelectElement>(null)

    const handleChange = () => {
        if (selectRef.current!.value == "custom") {
            CustomRef.current?.showModal()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedWeeks = [...weeks];
        updatedWeeks[weekIndex].events[index] = {
            ...updatedWeeks[weekIndex].events[index],
            [name]: value
        };

        setWeeks(updatedWeeks)
    };

    return (
        <tr>
            <td><input onChange={handleInputChange} name="name" type="text" className="input input-bordered w-full input-sm max-w-xs " /> </td>
            <td><input onChange={handleInputChange} name="description" type="text" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td><input onChange={handleInputChange} name="day" type="number" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td><input onChange={handleInputChange} name="startTime" type="time" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td><input onChange={handleInputChange} name="endTime" type="time" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td>
                <select id="recurrence" name="recurrence" className="select select-sm" ref={selectRef} onChange={handleChange}>
                    <option className="option" value="noRepeat">No Repeat</option>
                    <option className="option" value="weekdays">Weekdays</option>
                    <option className="option" value="weekends">Weekends</option>
                    <option className="option" value="everyday">Every Day</option>
                    <option className="option" value="custom" >custom</option>
                </select>
            </td>
        </tr>
    )
}

export default CalendarEvent