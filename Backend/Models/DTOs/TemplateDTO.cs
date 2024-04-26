namespace Backend.Models.DTOs
{
    public class TemplateDTO
    {
        public required string Name { get; set; }
        public ICollection<Week> Weeks { get; set; } = [];
    }
}