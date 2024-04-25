namespace Backend.Models
{
    public class Event
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public int Day { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public string? Recurrence { get; set; }
    }
}