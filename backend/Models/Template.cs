public class Template
{
    public string Name { get; set; }
    public string Description { get; set; }

    public Guid Id { get; set; } = Guid.NewGuid(); 
    public List<CalendarEvent> Events { get; set; } = new List<CalendarEvent>(); 
}