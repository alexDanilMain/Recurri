public class CalendarEvent
{
    public string Summary { get; set; }
    public string Location { get; set; }
    public EventDateTime Start { get; set; }
    public EventDateTime End { get; set; }
    public List<string> Recurrence { get; set; }
    public string ExtendedPropertiesJson { get; set; }  

    [NotMapped]  
    public Dictionary<string, Dictionary<string, string>> ExtendedProperties
    {
        get => string.IsNullOrEmpty(ExtendedPropertiesJson) ? null : JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, string>>>(ExtendedPropertiesJson);
        set => ExtendedPropertiesJson = JsonConvert.SerializeObject(value);
    }
}

public class EventDateTime
{
    public string DateTime { get; set; }
    public string TimeZone { get; set; }
}


// export type CalendarEvent = {
//     name: string,
//     description : string,
//     day: number,
//     startTime: string,
//     endTime: string,
//     recurrence: string
// }

// export type Week = {
//     number: number,
//     events: CalendarEvent[];
// }