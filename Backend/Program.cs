using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TemplateContext>(options =>
options.UseSqlServer(builder.Configuration
.GetConnectionString("TemplateContext") ?? throw new InvalidOperationException("Connection string 'AppDbContext' not found.")));


builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin());
// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
