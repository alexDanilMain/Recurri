import { addHours } from "date-fns";
import { getCookie } from "../App";

const now = new Date();
const newTime = addHours(now, 2)

export async function createCalendarEvent() {
  console.log("Creating calendar event");
  const event = {
    summary: "Testing calendar api",
    description: "testing calendar api",
    start: {
      dateTime: now.toISOString(), // Date.toISOString() ->
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
    },
    end: {
      dateTime: newTime.toISOString(), // Date.toISOString() ->
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
    },
  };

  await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getCookie("access_token")}`, // Access token for google
      },
      body: JSON.stringify(event),
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
}
