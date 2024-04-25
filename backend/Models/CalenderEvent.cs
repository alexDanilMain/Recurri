public class CalendarEvent
{
    public string Summary { get; set; }
    public string Location { get; set; }
    public EventDateTime Start { get; set; }
    public EventDateTime End { get; set; }
    public List<string> Recurrence { get; set; }
}

public class EventDateTime
{
    public string DateTime { get; set; }
    public string TimeZone { get; set; }
}
