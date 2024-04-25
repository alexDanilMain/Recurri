export type CalendarEvent = {
  name: string;
  description: string;
  day: number;
  startTime: string;
  endTime: string;
  recurrence: string;
};

export type Week = {
  number: number;
  events: CalendarEvent[];
};

export type Template = {
  weeks: Week[];
};

export default function templateToEvent(template: Template, startdate: number) {
  return [template.map(weeks => {
    summary: weeks.events.description,
      location: weeks.events.location,
      start: {
        dateTime: "2024-09-04T09:00:00+02:00",
        timeZone: "Europe/Stockholm",
      },
      end: {
        dateTime: "2024-09-04T11:00:00+02:00",
        timeZone: "Europe/Stockholm",
      },
      recurrence: [
        weeks.events.recurrence, // Occurs first Tuesday of the Sprint
      ],
      extendedProperties: {
        shared: {
          template: template.name,
        },
      },
    },
  })]
    
}
