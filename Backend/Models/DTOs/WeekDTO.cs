namespace Backend.Models.DTOs
{
    public class WeekDTO
    {
        public int Number { get; set; }
        public Event[] Events { get; set; } = [];
    }
}