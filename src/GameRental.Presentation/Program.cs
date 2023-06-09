using GameRental.Data.Models;
using GameRental.Data.Repositories;
using GameRental.Data.Settings;
using GameRental.Logic.Services;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Sieve.Models;
using Sieve.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<SieveOptions>(builder.Configuration.GetSection("Sieve"));
builder.Services.AddScoped<ISieveCustomSortMethods, SieveCustomSortMethods>();
builder.Services.AddScoped<ISieveCustomFilterMethods, SieveCustomFilterMethods>();

builder.Services.Configure<GameRentalDatabaseSettings>(
    builder.Configuration.GetSection("GameRentalDatabase")
);

// Dependency injections (singleton)
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<GameRentalDatabaseSettings>>();
    return new MongoClient(settings.Value.ConnectionString);
});

builder.Services.AddSingleton<GameRepository>();
builder.Services.AddSingleton<ContractRepository>();
builder.Services.AddSingleton<AccountRepository>();

// Dependency injections (scoped)
builder.Services.AddScoped<ISieveProcessor, SieveProcessor>();

builder.Services.AddScoped<GameService>();
builder.Services.AddScoped<ContractService>();
builder.Services.AddScoped<AccountService>();

builder.Services.AddScoped<IMongoCollection<Game>>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<GameRentalDatabaseSettings>>();
    var client = sp.GetRequiredService<IMongoClient>();
    var database = client.GetDatabase(settings.Value.DatabaseName);
    return database.GetCollection<Game>(settings.Value.GamesCollectionName);
});

builder.Services.AddScoped<IMongoCollection<Contract>>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<GameRentalDatabaseSettings>>();
    var client = sp.GetRequiredService<IMongoClient>();
    var database = client.GetDatabase(settings.Value.DatabaseName);
    return database.GetCollection<Contract>(settings.Value.ContractsCollectionName);
});

builder.Services.AddScoped<IMongoCollection<Account>>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<GameRentalDatabaseSettings>>();
    var client = sp.GetRequiredService<IMongoClient>();
    var database = client.GetDatabase(settings.Value.DatabaseName);
    return database.GetCollection<Account>(settings.Value.AccountsCollectionName);
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Seed the database for testing 
// using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
// {
//     var gamesCollection = scope.ServiceProvider.GetRequiredService<IMongoCollection<Game>>();
//     var contractsCollection = scope.ServiceProvider.GetRequiredService<IMongoCollection<Contract>>();
//     var accountsCollection = scope.ServiceProvider.GetRequiredService<IMongoCollection<Account>>();

//     if (gamesCollection.CountDocuments(new BsonDocument()) == 0)
//     {
//         var gamesToInsert = new List<Game>
//         {
//             new Game
//             {
//                 Title = "The Legend of Zelda: Tears of the Kingdom",
//                 Genre = new List<string> { "Action", "Adventure" },
//                 Platform = "Nintendo Switch",
//                 Explore = new List<string> { "Featured", "New release" },
//                 ReleaseDate = new DateOnly(2023, 11, 15),
//                 Developer = new List<string> { "Nintendo" },
//                 Publisher = "Nintendo",
//                 Description = "The Legend of Zelda: Tears of the Kingdom is an action-adventure game developed and published by Nintendo for the Nintendo Switch.",
//                 ESRBRating = "E10+",
//                 Media = new List<GameMedia>
//                 {
//                     new GameMedia
//                     {
//                         Type = "img",
//                         URL = "<URL>",
//                         Caption = "Screenshot from The Legend of Zelda: Tears of the Kingdom"
//                     },
//                     new GameMedia
//                     {
//                         Type = "video",
//                         URL = "<URL>",
//                         Caption = "Trailer for The Legend of Zelda: Tears of the Kingdom"
//                     }
//                 },
//                 Price = new RentPrice
//                 {
//                     ThreeDays = 5.99m,
//                     SevenDays = 9.99m,
//                     FourteenDays = 14.99m,
//                     ThirtyDays = 19.99m
//                 }
//             },
//             new Game
//             {
//                 Title = "God of War: Ragnarok",
//                 Genre = new List<string> { "Action", "Adventure" },
//                 Platform = "PlayStation 5",
//                 Explore = new List<string> { "Featured", "New release" },
//                 ReleaseDate = new DateOnly(2022, 6, 30),
//                 Developer = new List<string> { "Santa Monica Studio" },
//                 Publisher = "Sony Interactive Entertainment",
//                 Description = "God of War: Ragnarok is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment for the PlayStation 5.",
//                 ESRBRating = "M",
//                 Media = new List<GameMedia>
//                 {
//                     new GameMedia
//                     {
//                         Type = "img",
//                         URL = "<URL>",
//                         Caption = "Screenshot from God of War: Ragnarok"
//                     },
//                     new GameMedia
//                     {
//                         Type = "video",
//                         URL = "<URL>",
//                         Caption = "Trailer for God of War: Ragnarok"
//                     }
//                 },
//                 Price = new RentPrice
//                 {
//                     ThreeDays = 5.99m,
//                     SevenDays = 9.99m,
//                     FourteenDays = 14.99m,
//                     ThirtyDays = 19.99m
//                 }
//             },
//             new Game
//             {
//                 Title = "Dishonored 2",
//                 Genre = new List<string> { "Action", "Adventure", "Stealth" },
//                 Platform = "Xbox One",
//                 Explore = new List<string> { "Featured" },
//                 ReleaseDate = new DateOnly(2016, 11, 11),
//                 Developer = new List<string> { "Arkane Studios" },
//                 Publisher = "Bethesda Softworks",
//                 Description = "Dishonored 2 is an action-adventure stealth video game developed by Arkane Studios and published by Bethesda Softworks.",
//                 ESRBRating = "M",
//                 Media = new List<GameMedia>
//                 {
//                     new GameMedia
//                     {
//                         Type = "img",
//                         URL = "<URL>",
//                         Caption = "Screenshot from Dishonored 2"
//                     },
//                     new GameMedia
//                     {
//                         Type = "video",
//                         URL = "<URL>",
//                         Caption = "Trailer for Dishonored 2"
//                     }
//                 },
//                 Price = new RentPrice
//                 {
//                     ThreeDays = 5.99m,
//                     SevenDays = 9.99m,
//                     FourteenDays = 14.99m,
//                     ThirtyDays = 19.99m
//                 }
//             }
//         };

//         gamesCollection.InsertMany(gamesToInsert);
//     }

//     if (contractsCollection.CountDocuments(new BsonDocument()) == 0)
//     {
//         var contractsToInsert = new List<Contract>
//         {
//             // God of War
//             new Contract
//             {
//                 GameId = "6487f2fc8402d171deaa4e91",
//                 Status = "Active",
//                 CustomerInfo = new Customer
//                 {
//                     Name = "Chung Doe",
//                     PhoneNumber = "555-1234",
//                     Email = "chung@example.com",
//                     Address = "3947 Buckridge Flats, Apt. 675, 48869-1432, Lake Alvera, Louisiana, United States"
//                 },
//                 StartDate = new DateOnly(2022, 1, 1),
//                 EndDate = new DateOnly(2022, 1, 7),
//                 RentalDuration = 7,
//                 PaymentMethod = "Credit Card",
//                 ShipmentMethod = "UPS",
//                 ShippingFee = 5.99m,
//                 LateFee = 0m,
//                 TotalCost = 10.99m
//             },
//             new Contract
//             {
//                 GameId = "6487f2fc8402d171deaa4e91",
//                 Status = "Active",
//                 CustomerInfo = new Customer
//                 {
//                     Name = "John Doe",
//                     PhoneNumber = "555-1234",
//                     Email = "john@example.com",
//                     Address = "3947 Buckridge Flats, Apt. 675, 48869-1432, Lake Alvera, Louisiana, United States"
//                 },
//                 StartDate = new DateOnly(2022, 1, 1),
//                 EndDate = new DateOnly(2022, 1, 7),
//                 RentalDuration = 7,
//                 PaymentMethod = "Credit Card",
//                 ShipmentMethod = "UPS",
//                 ShippingFee = 5.99m,
//                 LateFee = 0m,
//                 TotalCost = 10.99m
//             },

//             // The Legend of Zelda
//             new Contract
//             {
//                 GameId = "6487f2fc8402d171deaa4e90",
//                 Status = "Completed",
//                 CustomerInfo = new Customer
//                 {
//                     Name = "Jane Smith",
//                     PhoneNumber = "555-5678",
//                     Email = "jane@example.com",
//                     Address = "3947 Buckridge Flats, Apt. 675, 48869-1432, Lake Alvera, Louisiana, United States"
//                 },
//                 StartDate = new DateOnly(2022, 2, 1),
//                 EndDate = new DateOnly(2022, 2, 7),
//                 RentalDuration = 7,
//                 PaymentMethod = "PayPal",
//                 ShipmentMethod = "FedEx",
//                 ShippingFee = 4.99m,
//                 LateFee = 2.99m,
//                 TotalCost = 12.99m
//             }
//         };

//         contractsCollection.InsertMany(contractsToInsert);
//     }

//     if (accountsCollection.CountDocuments(new BsonDocument()) == 0)
//     {
//         var accountsToInsert = new List<Account>
//         {
//             new Account
//             {
//                 Role = "Admin",
//                 UserName = "admin",
//                 Password = "admin1234",
//                 Email = "admin@gamerental.com"
//             },
//             new Account
//             {
//                 Role = "User",
//                 UserName = "user1",
//                 Password = "user1111",
//                 Email = "user1@example.com",
//                 ContractIds = new List<string>
//                 {
//                     "648fcff5ef238d6487c69763",
//                     "648fcff5ef238d6487c69764"
//                 }
//             },
//             new Account
//             {
//                 Role = "User",
//                 UserName = "user2",
//                 Password = "user2222",
//                 Email = "user2@example.com",
//                 ContractIds = new List<string>
//                 {
//                     "648fcff5ef238d6487c69765"
//                 }
//             }
//         };

//         accountsCollection.InsertMany(accountsToInsert);
//     }
// }


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
