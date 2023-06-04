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

        public async Task<Game?> Get(string id)
        {
            _logger.LogInformation("Retrieving game with id: {Id} from database", id);

            var game = await _gameRepository.GetAsync(id);

            _logger.LogInformation("Retrieved game with id: {Id} from database", id);

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
    
        public async Task Delete(string id){
            await _gameRepository.RemoveAsync(id);
        }
    }
}