import { RefObject, useRef } from "react"

type Props = {
    CustomRef: RefObject<HTMLDialogElement>
}

function CalendarEvent({ CustomRef }: Props) {

    const selectRef = useRef<HTMLSelectElement>(null)

    const handleChange = () => {
        if (selectRef.current!.value == "custom") {
            CustomRef.current?.showModal()
        }
    }

    return (
        <tr>
            <td><input type="text" className="input input-bordered w-full input-sm max-w-xs " /> </td>
            <td><input type="text" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td><input type="text" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td><input type="time" className="input input-bordered w-full input-sm max-w-xs " /></td>
            <td><input type="time" className="input input-bordered w-full input-sm max-w-xs " /></td>
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