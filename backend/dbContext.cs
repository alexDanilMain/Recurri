using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Template> Templates { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Template>().ToTable("Templates");
        modelBuilder.Entity<CalendarEvent>().ToTable("CalendarEvents");
        modelBuilder.Entity<EventDateTime>().ToTable("EventDateTimes");

        // Configure relationships and more complex constraints here
    }
}
