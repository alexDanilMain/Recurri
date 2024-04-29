import { RRule } from 'rrule';

interface EventTemplate {
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence: string[];
}

const generateDates = (template: EventTemplate): Date[] => {
  const rule = new RRule({
    ...RRule.fromString(template.recurrence[0].replace("RRULE:", "")),
    dtstart: new Date(template.start.dateTime),
    until: new Date(template.end.dateTime)
  });

  return rule.all();
};

const getHighlightedDates = (templates: EventTemplate[]): Date[] => {
  let dates: Date[] = [];
  templates.forEach(template => {
    dates = [...dates, ...generateDates(template)];
  });
  return dates;
};

// Example using sprint templates - assuming you've defined your sprintTemplates here.
const sprintTemplates: EventTemplate[] = [/* your sprint templates here */];
const highlightedDates: Date[] = getHighlightedDates(sprintTemplates);
