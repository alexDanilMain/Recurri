using Backend.Config;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TemplateContext>(options =>
options.UseSqlServer(builder.Configuration
.GetConnectionString("TemplateContext") ?? throw new InvalidOperationException("Connection string 'TemplateContext' not found.")));

builder.Services.AddCors();


builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", SecurityConfig.JwtSecurityScheme);
    options.AddSecurityRequirement(SecurityConfig.JwtSecurityRequirement);
});

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.Authority = "https://accounts.google.com";
    options.Audience = "1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com";
});

var app = builder.Build();

app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin());
// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
