using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Http.Json;

public class CalendarEvent
{
    
    [Key] 
    public Guid Id { get; set; }
    public string Summary { get; set; }
    public string Location { get; set; }
    public EventDateTime Start { get; set; }
    public EventDateTime End { get; set; }
    public List<string> Recurrence { get; set; }
    public string ExtendedPropertiesJson { get; set; }  


}

public class EventDateTime
{
    [Key] 
    public Guid Id { get; set; }
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