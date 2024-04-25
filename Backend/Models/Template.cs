namespace Backend.Models
{
    public class Template
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public Week[] Weeks {get; set;} = [];

    }
}