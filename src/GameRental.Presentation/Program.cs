using GameRental.Data.Models;
using GameRental.Data.Repositories;
using GameRental.Data.Settings;
using GameRental.Logic.Services;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<GameRentalDatabaseSettings>(
    builder.Configuration.GetSection("GameRentalDatabase")
);

builder.Services.AddSingleton<GameRepository>();
builder.Services.AddSingleton<GameService>();

// Dependency injections (scoped)
builder.Services.AddScoped<IMongoCollection<Game>>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<GameRentalDatabaseSettings>>();
    var client = new MongoClient(settings.Value.ConnectionString);
    var database = client.GetDatabase(settings.Value.DatabaseName);
    return database.GetCollection<Game>(settings.Value.GamesCollectionName);
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Seed the database for testing 
using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    var gamesCollection = scope.ServiceProvider.GetRequiredService<IMongoCollection<Game>>();

    if (gamesCollection.CountDocuments(new BsonDocument()) == 0)
    {
        var gamesToInsert = new List<Game>
        {
            new Game
            {
                Title = "The Legend of Zelda: Tears of the Kingdom",
                Genre = new List<string> { "Action-adventure" },
                Platform = "Nintendo Switch"
            },
            new Game
            {
                Title = "God of War: Ragnarok",
                Genre = new List<string> { "Action-adventure", "Hack and slash" },
                Platform = "PlayStation 5"
            },
            new Game
            {
                Title = "Dishonored 2",
                Genre = new List<string> { "Action-adventure", "Stealth" },
                Platform = "Xbox One"
            }
        };

        gamesCollection.InsertMany(gamesToInsert);
    }
}


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
