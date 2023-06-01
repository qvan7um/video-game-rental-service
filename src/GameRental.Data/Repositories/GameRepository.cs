using GameRental.Data.Models;
using GameRental.Data.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace GameRental.Data.Repositories
{
    public class GameRepository
    {
        private readonly IMongoCollection<Game> _gamesCollection;
        private readonly ILogger<GameRepository> _logger;

        public GameRepository(IOptions<GameRentalDatabaseSettings> settings, ILogger<GameRepository> logger)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _gamesCollection = mongoDatabase.GetCollection<Game>(settings.Value.GamesCollectionName);

            _logger = logger;
        }

        public async Task<List<Game>> GetAsync()
        {
            _logger.LogInformation("Querying games collection in database");

            var games = await _gamesCollection.Find(_ => true).ToListAsync();

            _logger.LogInformation("Retrieved {Count} game(s) from database", games.Count);

            return games;
        }

        public async Task<Game?> GetAsync(string id)
        {
            _logger.LogInformation("Querying games collection in database");

            var game = await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            _logger.LogInformation("Retrieved game with id: {Id} from database", game.Id);

            return game;
        }

        public async Task CreateAsync(Game newGame)
        {
            _logger.LogInformation("Creating new game document in games collection");

            await _gamesCollection.InsertOneAsync(newGame);

            _logger.LogInformation("Created new game document with id: {Id}", newGame.Id);
        }

        public async Task UpdateAsync(string id, Game updatedGame) =>
            await _gamesCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);

        public async Task RemoveAsync(string id) =>
            await _gamesCollection.DeleteOneAsync(x => x.Id == id);
    }
}