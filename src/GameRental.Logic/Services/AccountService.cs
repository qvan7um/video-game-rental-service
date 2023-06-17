using GameRental.Data.Models;
using GameRental.Data.Repositories;
using Microsoft.Extensions.Logging;

namespace GameRental.Logic.Services
{
    public class AccountService
    {
        private readonly AccountRepository _accountRepository;
        private readonly ILogger<AccountService> _logger;

        public AccountService(AccountRepository accountRepository, ILogger<AccountService> logger)
        {
            _accountRepository = accountRepository;
            _logger = logger;
        }

        public async Task<List<Account>> Get()
        {
            var accounts = await _accountRepository.GetAsync();

            return accounts;
        }

        public async Task<Account> Get(string id)
        {
            var account = await _accountRepository.GetAsync(id);

            return account;
        }

        public async Task Create(Account newAccount)
        {
            await _accountRepository.CreateAsync(newAccount);
        }

        public async Task Update(string id, Account updatedAccount)
        {
            await _accountRepository.UpdateAsync(id, updatedAccount);
        }

        public async Task Delete(string id)
        {
            await _accountRepository.RemoveAsync(id);
        }
    }
}