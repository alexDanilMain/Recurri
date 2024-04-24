export const sprint = [
  {
    summary: "Sprint Planning",
    location: "Conference Room A, Office",
    start: {
      dateTime: "2024-09-04T09:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    end: {
      dateTime: "2024-09-04T11:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    recurrence: [
      "RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=TU", // Occurs first Tuesday of the Sprint
    ],
  },
  {
    summary: "Daily Stand-up",
    location: "Conference Room A, Office",
    start: {
      dateTime: "2024-09-04T10:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    end: {
      dateTime: "2024-09-04T10:15:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    recurrence: [
      "RRULE:FREQ=DAILY;COUNT=10;BYDAY=MO,TU,WE,TH,FR", // Weekdays for two weeks excluding weekends
    ],
  },
  {
    summary: "Sprint Review",
    location: "Conference Room A, Office",
    start: {
      dateTime: "2024-09-15T15:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    end: {
      dateTime: "2024-09-15T16:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    recurrence: [
      "RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=FR", // Last Friday of the Sprint
    ],
  },
  {
    summary: "Sprint Retrospective",
    location: "Conference Room A, Office",
    start: {
      dateTime: "2024-09-15T16:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    end: {
      dateTime: "2024-09-15T17:00:00+02:00",
      timeZone: "Europe/Stockholm",
    },
    recurrence: [
      "RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=FR", // Last Friday of the Sprint, following the Review
    ],
  },
];
