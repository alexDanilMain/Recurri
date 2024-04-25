import { addHours } from "date-fns";

const now = new Date();
const newTime = addHours(now, 2);

export const event = {
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
