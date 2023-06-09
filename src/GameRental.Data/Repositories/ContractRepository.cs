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

        public async Task<Contract> GetAsync(string id)
        {
            _logger.LogInformation("Querying contract with id: {Id}", id);

            var contract = await _contractsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            _logger.LogInformation("Retrieved contract with id: {Id}", contract.Id);

            return contract;
        }

        public async Task CreateAsync(Contract newContract)
        {
            _logger.LogInformation("Creating new contract");

            await _contractsCollection.InsertOneAsync(newContract);

            _logger.LogInformation("Created new contract with id: {Id}", newContract.Id);
        }

        public async Task UpdateAsync(string id, Contract updatedContract)
        {
            _logger.LogInformation("Updating contract with id: {Id}", id);

            await _contractsCollection.ReplaceOneAsync(x => x.Id == id, updatedContract);

            _logger.LogInformation("Updated contract with id: {Id}", updatedContract.Id);
        }

        public async Task RemoveAsync(string id)
        {
            _logger.LogInformation("Removing contract with id: {Id}", id);

            await _contractsCollection.DeleteOneAsync(x => x.Id == id);

            _logger.LogInformation("Removed contract with id: {Id}", id);
        }
    }
}