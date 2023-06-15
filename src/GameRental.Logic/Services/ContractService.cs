using GameRental.Data.Models;
using GameRental.Data.Repositories;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace GameRental.Logic.Services
{
    public class ContractService
    {
        internal static readonly decimal LATE_FEE_PER_DAY = 1.0m;

        private readonly ContractRepository _contractRepository;
        private readonly GameRepository _gameRepository;
        private readonly ILogger<ContractRepository> _logger;

        public ContractService(ContractRepository contractRepository, GameRepository gameRepository, ILogger<ContractRepository> logger)
        {
            _contractRepository = contractRepository;
            _gameRepository = gameRepository;
            _logger = logger;
        }

        public async Task<List<Contract>> Get()
        {
            var contracts = await _contractRepository.GetAsync();

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

            if (newContract.Id != null)
            {
                await CalculateLateFee(newContract.Id);
                await CalculateTotalCost(newContract.Id);
            }
        }

        public async Task Update(string id, Contract updatedContract)
        {
            await _contractRepository.UpdateAsync(id, updatedContract);

            if (updatedContract.Id != null)
            {
                await CalculateLateFee(updatedContract.Id);
                await CalculateTotalCost(updatedContract.Id);
            }
        }

        public async Task Delete(string id)
        {
            await _contractRepository.RemoveAsync(id);
        }

        public async Task<List<Contract>> Search(string? searchTerm)
        {
            var contracts = await _contractRepository.SearchAsync(searchTerm);

            return contracts;
        }

        public async Task CalculateLateFee(string id)
        {
            try
            {
                var contract = await _contractRepository.GetAsync(id);
                
                if (contract == null)
                {
                    throw new ArgumentException($"Contract with id: {id} not found");
                }

                DateOnly currentDate = DateOnly.FromDateTime(DateTime.Today);
                int daysLate = currentDate.DayNumber - contract.EndDate.DayNumber;

                if (daysLate > 0)
                {
                    decimal lateFee = daysLate * LATE_FEE_PER_DAY;

                    contract.LateFee = lateFee;
                    await _contractRepository.UpdateAsync(id, contract);
                }
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "An error occured due to invalid arguments");
                throw;
            }
        }

        public async Task CalculateTotalCost(string id)
        {
            try
            {
                var contract = await _contractRepository.GetAsync(id);

                if (contract == null)
                {
                    throw new ArgumentException($"Contract with id: {id} not found");
                }

                var game = await _gameRepository.GetAsync(contract.GameId);

                if (game == null)
                {
                    throw new ArgumentException($"Game with id: {contract.GameId}");
                }

                int rentalDuration = contract.EndDate.DayNumber - contract.StartDate.DayNumber;

                if (rentalDuration < 0)
                {
                    throw new ArgumentException("EndDate must not be less than StartDate");
                }

                decimal rentalCost;

                if (rentalDuration <= 3)
                {
                    rentalCost = game.Price.ThreeDays;
                }
                else if (rentalDuration <= 7)
                {
                    rentalCost = game.Price.SevenDays;
                }
                else if (rentalDuration <= 14)
                {
                    rentalCost = game.Price.FourteenDays;
                }
                else
                {
                    rentalCost = game.Price.ThirtyDays;
                }

                decimal totalCost = rentalCost + (contract.ShippingFee ?? 0);

                contract.TotalCost = totalCost;
                await _contractRepository.UpdateAsync(id, contract);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "An error occured due to invalid arguments");
                throw;
            }
        }
    }
}