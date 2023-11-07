using kabinizer_api;
using kabinizer_api.Services.Draw;
using kabinizer_api.Services.Period;
using kabinizer_data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<DrawService>();
builder.Services.AddScoped<PeriodService>();

// Add services to the container.
builder.Services.AddControllers();


builder.Services.AddDbContext<EntityContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("KabinizerConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Migrate db
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<EntityContext>();
    dataContext.Database.Migrate();
}

app.Run();



