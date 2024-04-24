public class CalendarEvent
{
    public string Summary { get; set; }
    public string Location { get; set; }
    public int StartDateTime { get; set; }
    public int EndDateTime { get; set; }
    public string TimeZone { get; set; }
    public Recurrence Recurrence { get; set; }
}

public class Recurrence
{
    public string Frequency { get; set; } 
    public int Count { get; set; }
    public string ByDay { get; set; } 
}
