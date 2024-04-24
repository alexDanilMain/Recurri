import { useRef } from "react"
import CalendarEvent from "./Event/CalendarEvent"


function WeekTable() {
    const CustomRef = useRef<HTMLDialogElement>(null)


    return (
        <>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Week</th>
                        <th><input type="number" className="input input-bordered w-full input-sm max-w-xs" placeholder="Week number" /></th>
                        <th><button className="btn btn-sm"> + Add Day</button></th>
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
                    <CalendarEvent CustomRef={CustomRef} />
                </tbody>
            </table>

            <dialog id="my_modal_3" className="modal z-20" ref={CustomRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form action="" className="form-control items-center">

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 1</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 2</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 3</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 4</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 5</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 6</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 7</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <input type="text" />
                        <input type="submit" className="btn btn-sm" value="Apply" />
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default WeekTable