import { parse } from 'rrule';

const getSprintDates = (sprint) => {
  const events = [];
  sprint.forEach(item => {
    const { start, recurrence } = item;
    const rule = parse(recurrence[0], new Date(start.dateTime));
    events.push(...rule.all());
  });
  return events;
};
