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
                Genre = new List<string> { "Action", "Adventure" },
                Platform = "Nintendo Switch",
                Explore = new List<string> { "Featured", "New release" },
                ReleaseDate = new DateTime(2023, 11, 15),
                Developer = new List<string> { "Nintendo" },
                Publisher = "Nintendo",
                Description = "The Legend of Zelda: Tears of the Kingdom is an action-adventure game developed and published by Nintendo for the Nintendo Switch.",
                ESRBRating = "E10+"
            },
            new Game
            {
                Title = "God of War: Ragnarok",
                Genre = new List<string> { "Action", "Adventure" },
                Platform = "PlayStation 5",
                Explore = new List<string> { "Featured", "New release" },
                ReleaseDate = new DateTime(2022, 6, 30),
                Developer = new List<string> { "Santa Monica Studio" },
                Publisher = "Sony Interactive Entertainment",
                Description = "God of War: Ragnarok is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment for the PlayStation 5.",
                ESRBRating = "M"
            },
            new Game
            {
                Title = "Dishonored 2",
                Genre = new List<string> { "Action", "Adventure", "Stealth" },
                Platform = "Xbox One",
                Explore = new List<string> { "Featured" },
                ReleaseDate = new DateTime(2016, 11, 11),
                Developer = new List<string> { "Arkane Studios" },
                Publisher = "Bethesda Softworks",
                Description = "Dishonored 2 is an action-adventure stealth video game developed by Arkane Studios and published by Bethesda Softworks.",
                ESRBRating = "M"
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
