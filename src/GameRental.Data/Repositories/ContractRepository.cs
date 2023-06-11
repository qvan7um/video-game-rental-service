using GameRental.Data.Models;
using GameRental.Data.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System.Text.Json;
using System.Linq;
using MongoDB.Driver.Linq;

namespace GameRental.Data.Repositories
{
    public class ContractRepository
    {
        private readonly IMongoCollection<Contract> _contractsCollection;
        private readonly IMongoCollection<Game> _gamesCollection;
        private readonly ILogger<ContractRepository> _logger;

        public ContractRepository(IMongoClient mongoClient, IOptions<GameRentalDatabaseSettings> settings, ILogger<ContractRepository> logger)
        {
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _contractsCollection = mongoDatabase.GetCollection<Contract>(settings.Value.ContractsCollectionName);
            _gamesCollection = mongoDatabase.GetCollection<Game>(settings.Value.GamesCollectionName);

            _logger = logger;
        }

        public async Task<List<Contract>> GetAsync()
        {
            try
            {
                _logger.LogInformation("Querying contracts collection in database");

                var contracts = await _contractsCollection.Find(_ => true).ToListAsync();

                _logger.LogInformation("Retrieved {Count} contracts from database", contracts.Count);

                return contracts;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while retrieving contracts from database");
                // ...
                throw;
            }
        }

        public async Task<Contract> GetAsync(string id)
        {
            try
            {
                _logger.LogInformation("Querying contract with id: {Id}", id);

                var contract = await _contractsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

                _logger.LogInformation("Retrieved contract with id: {Id}", contract.Id);

                return contract;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while retrieving contracts with id: {Id} from database", id);
                // ...
                throw;
            }
        }

        public async Task CreateAsync(Contract newContract)
        {
            try
            {
                _logger.LogInformation("Creating new contract");

                await _contractsCollection.InsertOneAsync(newContract);

                _logger.LogInformation("Created new contract with id: {Id}", newContract.Id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while creating a new contract");
                // ...
                throw;
            }
        }

        public async Task UpdateAsync(string id, Contract updatedContract)
        {
            try
            {
                _logger.LogInformation("Updating contract with id: {Id}", id);

                await _contractsCollection.ReplaceOneAsync(x => x.Id == id, updatedContract);

                _logger.LogInformation("Updated contract with id: {Id}", updatedContract.Id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while updating contract with id: {Id}", id);
                // ...
                throw;
            }
        }

        public async Task RemoveAsync(string id)
        {
            try
            {
                _logger.LogInformation("Removing contract with id: {Id}", id);

                await _contractsCollection.DeleteOneAsync(x => x.Id == id);

                _logger.LogInformation("Removed contract with id: {Id}", id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while removing contract with id: {Id}", id);
                // ...
                throw;
            }
        }

        public async Task<List<Contract>> SearchAsync(string? searchTerm)
        {
            try
            {
                var contracts = await GetAsync();
                
                if(searchTerm == null || searchTerm.Trim() == " ")
                {
                    return contracts;
                }

                var searchedGames = _gamesCollection.AsQueryable<Game>()
                    .Where(x => x.Title.ToLower().Contains(searchTerm.Trim().ToLower()));
                
                var games = _gamesCollection.Find(x => x.Title.ToLower().Contains(searchTerm.Trim().ToLower())).ToEnumerable();
                
                var res = await _contractsCollection.Find(x => 
                    games.Any(a => a.Id == x.GameId) 
                ).ToListAsync();

                return res;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while searching for contracts (searchTerm: {SearchTerm})", searchTerm);
                // ...
                throw;
            }
        }

     }
}