import { addHours } from "date-fns";
import { getCookie } from "../helpers/CookieHelpers";

interface EventData {
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  location: string;
  id: string;
}

interface EventDataArr {
  items: EventData[];
}

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
        template: "salt",
      },
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

export const getSingleEvent = async (): Promise<EventData | null> => {
  try {
    const response = await fetch(
      BASE_URL +
        "/vjp0ov2kgqgealhn2aptl9h89o?key=" +
        import.meta.env.VITE_APP_API_KEY,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const eventData: EventData = await response.json();
    console.log("eventData", eventData);
    return eventData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

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
  );
  alert("Event deleted, check your Google Calendar!");
}

export const getReocurringEvents = async (
  template: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      BASE_URL +
        `?sharedExtendedProperty=template%3D${template}&key=${
          import.meta.env.VITE_APP_API_KEY
        }`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const eventDataArr: EventDataArr = await response.json();
    console.log("eventDataArr", eventDataArr.items[0].id);
    return eventDataArr.items[0].id;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export async function deleteTemplate(template: string) {
  const result = await getReocurringEvents(template);
  console.log("Deleting events with id: ", result);
  await deleteCalendarEvent(result!);
  alert("Event deleted, check your Google Calendar!");
}