using GameRental.Data.Models;
using GameRental.Data.Repositories;
using Microsoft.Extensions.Logging;

namespace GameRental.Logic.Services
{
    public class ContractService
    {
        private readonly ContractRepository _contractRepository;
        private readonly ILogger<ContractRepository> _logger;

        public ContractService(ContractRepository contractRepository, ILogger<ContractRepository> logger)
        {
            _contractRepository = contractRepository;
            _logger = logger;
        }

        public async Task<List<Contract>> Get()
        {
            _logger.LogInformation("Retrieving games from database");

            var contracts = await _contractRepository.GetAsync();

            _logger.LogInformation("Retrieved {Count} games from database", contracts.Count);

            return contracts;
        }

        public async Task<Contract> Get(string id)
        {
            var contract = await _contractRepository.GetAsync(id);

            return contract;
        }

        public async Task Create(Contract newContract)
        {
            await _contractRepository.CreateAsync(newContract);
        }

        public async Task Update(string id, Contract updatedContract)
        {
            await _contractRepository.UpdateAsync(id, updatedContract);
        }

        public async Task Delete(string id)
        {
            await _contractRepository.RemoveAsync(id);
        }

        public async Task<List<Contract>> Search(string? searchTerm)
        {
            _logger.LogInformation("Retrieving games from database");

            var contracts = await _contractRepository.SearchAsync(searchTerm);

            _logger.LogInformation("Retrieved {Count} games from database", contracts.Count);

            return contracts;
        }
    }
}