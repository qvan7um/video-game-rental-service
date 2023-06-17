using GameRental.Data.Models;
using GameRental.Data.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace GameRental.Data.Repositories
{
    public class AccountRepository
    {
        private readonly IMongoCollection<Account> _accountsCollection;
        private readonly ILogger<AccountRepository> _logger;

        public AccountRepository(IMongoClient mongoClient, IOptions<GameRentalDatabaseSettings> settings, ILogger<AccountRepository> logger)
        {
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _accountsCollection = mongoDatabase.GetCollection<Account>(settings.Value.AccountsCollectionName);

            _logger = logger;
        }

        public async Task<List<Account>> GetAsync()
        {
            try
            {
                _logger.LogInformation("Querying accounts collection in database");

                var accounts = await _accountsCollection.Find(_ => true).ToListAsync();

                _logger.LogInformation("Retrieved {Count} contracts from database", accounts.Count);

                return accounts;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while retrieving accounts from database");
                // ...
                throw;
            }
        }

        public async Task<Account> GetAsync(string id)
        {
            try
            {
                _logger.LogInformation("Querying account with id: {Id}", id);

                var account = await _accountsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

                _logger.LogInformation("Retrieved account with id: {Id}", account.Id);

                return account;
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while retrieving account with id: {Id} from database", id);
                // ...
                throw;
            }
        }

        public async Task CreateAsync(Account newAccount)
        {
            try
            {
                _logger.LogInformation("Creating new account");

                await _accountsCollection.InsertOneAsync(newAccount);

                _logger.LogInformation("Created new account with id: {Id}", newAccount.Id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while creating a new account");
                // ...
                throw;
            }
        }

        public async Task UpdateAsync(string id, Account updatedAccount)
        {
            try
            {
                _logger.LogInformation("Updating account with id: {Id}", id);

                await _accountsCollection.ReplaceOneAsync(x => x.Id == id, updatedAccount);

                _logger.LogInformation("Updated account with id: {Id}", updatedAccount.Id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while updating account with id: {Id}", id);
                // ...
                throw;
            }
        }

        public async Task RemoveAsync(string id)
        {
            try
            {
                _logger.LogInformation("Removing account with id: {Id}", id);

                await _accountsCollection.DeleteOneAsync(x => x.Id == id);

                _logger.LogInformation("Removed account with id: {Id}", id);
            }
            catch (MongoException ex)
            {
                _logger.LogError(ex, "An error occured while removing account with id: {Id}", id);
                // ...
                throw;
            }
        }
    }
}