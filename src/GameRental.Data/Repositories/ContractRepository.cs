using GameRental.Data.Models;
using GameRental.Data.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace GameRental.Data.Repositories
{
    public class ContractRepository
    {
        private readonly IMongoCollection<Contract> _contractsCollection;
        private readonly ILogger<ContractRepository> _logger;

        public ContractRepository(IMongoClient mongoClient, IOptions<GameRentalDatabaseSettings> settings, ILogger<ContractRepository> logger)
        {
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _contractsCollection = mongoDatabase.GetCollection<Contract>(settings.Value.ContractsCollectionName);

            _logger = logger;
        }

        public async Task<List<Contract>> GetAsync()
        {
            _logger.LogInformation("Querying contracts collection in database");

            var contracts = await _contractsCollection.Find(_ => true).ToListAsync();

            _logger.LogInformation("Retrieved {Count} contracts from database", contracts.Count);

            return contracts;
        }
    }
}