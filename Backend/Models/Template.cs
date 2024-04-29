using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Template
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public ICollection<Event> Events {get; set;} = [];

        [EmailAddress]
        public required string UserEmail {get; set;}   

    }
}