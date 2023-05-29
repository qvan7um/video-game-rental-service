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
            _logger.LogInformation("Retrieving games from database");

            var games = await _gameRepository.GetAsync();

            _logger.LogInformation("Retrieved {Count} games from database", games.Count);

            return games;
        }

        public async Task<Game?> Get(string id) =>
            await _gameRepository.GetAsync(id);
    }
}