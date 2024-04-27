import { FormEvent, useRef, useState } from "react";
import { addDays, addHours, addMinutes, startOfDay } from "date-fns";
import WeekTable from "../weekTable/WeekTable";
import { CalendarEvent, GoogleEvent } from "../event/CalendarEvent";
import { createCalendarTemplate } from "../../api/CalendarApi";
import { Template, saveCalendarTemplate } from "../../api/TemplateApi";
import { useGoogleLogin } from "@react-oauth/google";
import { setCookie } from "../../helpers/CookieHelpers";


export type Week = {
    number: number,
    events: CalendarEvent[];
}

function CreateTemplate() {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const CustomRef = useRef<HTMLDialogElement>(null)

    const handleAddWeek = () => {
        const newWeek = {
            number: 1, events: [{
                name: "",
                description: "",
                day: 0,
                startTime: "",
                endTime: "",
                recurrence: ""
            }
            ]
        };
        setWeeks((prevWeeks) => [...prevWeeks, newWeek]);
    };

    const handleAddEvent = (weekIndex: number) => {
        const newEvent: CalendarEvent = {
            name: "",
            description: "",
            day: 0,
            startTime: "",
            endTime: "",
            recurrence: ""
        };
        const updatedWeeks = [...weeks];
        updatedWeeks[weekIndex].events.push(newEvent);
        setWeeks(() => updatedWeeks);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(weeks)
        saveTemplate(weeks);
    }

    const saveTemplate = (weeks: Week[]) => {
        const template: Template = {
            userEmail: sessionStorage.getItem("email")!,
            name: "TestTemplate",
            weeks: weeks
        }
        saveCalendarTemplate(template);
    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse)
            setCookie('access_token', codeResponse.access_token!, 1);

        },
        scope: 'https://www.googleapis.com/auth/calendar',
        include_granted_scopes: true
    });

    const convertToGoogle = (weeks: Week[], templateStart: Date) => {
        login();
        const googleEvents: GoogleEvent[] = [];

        weeks.forEach((week) => {
            let startDate = templateStart
            let endDate = templateStart
            week.events.forEach((event) => {
                console.log(event.day)
                startDate = startOfDay(startDate)
                let endaddDays = ((week.number - 1) * 7) + (event.day - 1)

                startDate = addDays(startDate, endaddDays)

                const [hoursString, minutesString] = event.startTime.split(":");
                const hours = parseInt(hoursString, 10);
                const minutes = parseInt(minutesString, 10);
                startDate = addHours(startDate, hours + 2)
                startDate = addMinutes(startDate, minutes)

                endDate = startOfDay(endDate)
                endDate = addDays(endDate, endaddDays)

                const [endHoursString, endMinutesString] = event.endTime.split(":");
                const endHours = parseInt(endHoursString, 10);
                const endMinutes = parseInt(endMinutesString, 10);
                endDate = addHours(endDate, endHours + 2)
                endDate = addMinutes(endDate, endMinutes)

                const googleEvent: GoogleEvent = {
                    summary: event.name,
                    description: event.description,
                    start: {
                        dateTime: startDate.toISOString(),
                        timeZone: "Europe/Stockholm"
                    },
                    end: {
                        dateTime: endDate.toISOString(),
                        timeZone: "Europe/Stockholm"
                    },
                    recurrence: event.recurrence ? [event.recurrence] : [],
                    extendedProperties: {
                        shared: {
                            template: "sprint"
                        }
                    }
                };

                googleEvents.push(googleEvent);
            });
        });

        console.log(googleEvents)
        createCalendarTemplate(googleEvents);
    }

    return (
        <section className="px-4">
            <form action="" onSubmit={handleSubmit}>
                <button type="button" onClick={handleAddWeek} className="btn btn-sm">+ Add Week</button>
                <WeekTable weeks={weeks} handleAddEvent={handleAddEvent} setWeeks={setWeeks} CustomRef={CustomRef} />
                <input type="submit" className="btn btn-sm mt-4" value="Create Template" />
                <button className="btn btn-sm" onClick={() => convertToGoogle(weeks, new Date())}> Convert To google </button>

            </form>
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
        </section>
    )
}

export default CreateTemplate