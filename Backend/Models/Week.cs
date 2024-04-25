namespace Backend.Models
{
    public class Week
    {
        public int Id { get; set; }
        public int Number {get; set;}
        public Event[] Events {get; set;} = [];
    }
}