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

        public GameRepository(IMongoClient mongoClient, IOptions<GameRentalDatabaseSettings> settings, ILogger<GameRepository> logger)
        {
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _gamesCollection = mongoDatabase.GetCollection<Game>(settings.Value.GamesCollectionName);

            _logger = logger;
        }

        public async Task<List<Game>> GetAsync()
        {
            try
            {
                _logger.LogInformation("Querying games collection in database");

                var games = await _gamesCollection.Find(_ => true).ToListAsync();

                _logger.LogInformation("Retrieved {Count} game(s) from database", games.Count);

                return games;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while retrieving games from database");
                // ...
                throw;
            }
        }

        public async Task<Game?> GetAsync(string id)
        {
            try
            {
                _logger.LogInformation("Querying games collection in database");

                var game = await _gamesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

                _logger.LogInformation("Retrieved game with id: {Id} from database", game.Id);

                return game;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while retrieving game with id: {Id} from database", id);
                // ...
                throw;
            }
        }

        public async Task CreateAsync(Game newGame)
        {
            try
            {
                _logger.LogInformation("Creating new game document in games collection");

                await _gamesCollection.InsertOneAsync(newGame);

                _logger.LogInformation("Created new game document with id: {Id}", newGame.Id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while creating a new game");
                // ...
                throw;
            }
        }

        public async Task UpdateAsync(string id, Game updatedGame)
        {
            try
            {
                _logger.LogInformation("Updating game with id: {Id}", id);

                await _gamesCollection.ReplaceOneAsync(x => x.Id == id, updatedGame);

                _logger.LogInformation("Updated game with id: {Id}", updatedGame.Id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while updating game with id: {Id}", id);
                // ...
                throw;
            }
        }

        public async Task RemoveAsync(string id)
        {
            try
            {
                _logger.LogInformation("Removing game with id: {Id}", id);

                await _gamesCollection.DeleteOneAsync(x => x.Id == id);

                _logger.LogInformation("Removed game with id: {Id}", id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while removing game with id: {Id}", id);
                // ...
                throw;
            }
        }

        public async Task<List<Game>> SearchAsync(string? searchTerm)
        {
            try
            {
                var games = await GetAsync();

                if (searchTerm == null || searchTerm.Trim() == "")
                {
                    return games;
                }

                var results = await _gamesCollection.Find(x => x.Title.ToLower().Contains(searchTerm.Trim().ToLower())).ToListAsync();

                return results;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error while searching for games (searchTerm: {SearchTerm})", searchTerm);
                // ...
                throw;
            }
        }
    }
}