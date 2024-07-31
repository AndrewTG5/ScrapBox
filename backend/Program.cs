using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Allow CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyOrigin() // For localhost only. Allow all
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<ScrapletContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")  ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
