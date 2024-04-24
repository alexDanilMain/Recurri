import { addHours } from "date-fns";
import { getCookie } from "../helpers/CookieHelpers";

const now = new Date();
const newTime = addHours(now, 2);
const BASE_URL =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";

export async function createCalendarEvent() {
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

  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    body: JSON.stringify(event),
  }).then((data) => {
    alert("Event created, check your Google Calendar!");
    return data.json();
  });
}

export async function createCalendarTemplate() {
  const event = {
    summary: "Coding Bootcamp Demo",
    location: "Bootcamp Venue, Stockholm",
    start: {
      dateTime: "2024-06-02T15:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    end: {
      dateTime: "2024-06-02T16:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    recurrence: ["RRULE:FREQ=WEEKLY;COUNT=11;BYDAY=MO"],
    extendedProperties: {
        shared: {
          template: "salt"
        }
      }
  };

  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    body: JSON.stringify(event),
  }).then((data) => {
    alert("Event created, check your Google Calendar!");
    return data.json();
  });
}

export async function deleteCalendarEvent(eventId: string) {
  await fetch(
    BASE_URL + `/${eventId}?key=${import.meta.env.VITE_APP_API_KEY}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    }
  ).then((data) => {
    alert("Event deleted, check your Google Calendar!");
    return data.json();
  });
}

export async function deleteTemplate(template: string) {}