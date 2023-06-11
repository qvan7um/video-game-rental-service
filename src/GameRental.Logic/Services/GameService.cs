using GameRental.Data.Models;
using GameRental.Data.Repositories;
using Microsoft.Extensions.Logging;

namespace GameRental.Logic.Services
{
    public class GameService
    {
        private readonly GameRepository _gameRepository;
        private readonly ILogger<GameService> _logger;

        public GameService(GameRepository gameRepository, ILogger<GameService> logger)
        {
            _gameRepository = gameRepository;
            _logger = logger;
        }

        public async Task<List<Game>> Get()
        {
            var games = await _gameRepository.GetAsync();

            return games;
        }

        public async Task<Game?> Get(string id)
        {
            var game = await _gameRepository.GetAsync(id);

            return game;
        }

        public async Task Create(Game newGame)
        {
            await _gameRepository.CreateAsync(newGame);
        }

        public async Task Update(string id, Game updatedGame)
        {
            await _gameRepository.UpdateAsync(id, updatedGame);
        }
    
        public async Task Delete(string id)
        {
            await _gameRepository.RemoveAsync(id);
        }

        public async Task<List<Game>> Search(string? searchTerm)
        {
            var games = await _gameRepository.SearchAsync(searchTerm);

            return games;
        }
    }
}