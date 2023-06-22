using GameRental.Data.Models;
using GameRental.Logic.Services;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace GameRental.Presentation.Controllers;

[ApiController]
[Route("api")]
public class GameController : ControllerBase
{
    private readonly GameService _gameService;
    private readonly ILogger<GameController> _logger;
    private readonly ISieveProcessor _sieveProcessor;

    public GameController(GameService gameService, ILogger<GameController> logger, ISieveProcessor sieveProcessor)
    {
        _gameService = gameService;
        _logger = logger;
        _sieveProcessor = sieveProcessor;
    }

    [HttpGet("games")]
    public async Task<IActionResult> Get([FromQuery] SieveModel sieveModel)
    {
        try
        {
            _logger.LogInformation("Received GET request to api/games endpoint");

            var games = await _gameService.Get();

            var result = _sieveProcessor.Apply(sieveModel, games.AsQueryable());

            _logger.LogInformation("Retrieved {Count} games from database", games.Count);

            return Ok(result.ToList());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing GET request to api/games endpoint");
            // ...
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("games/search")]
    public async Task<IActionResult> Get([FromQuery] ParameterModel sieveModel)
    {
        try
        {
            _logger.LogInformation("Received GET request to /game/search endpoint");

            var games = await _gameService.Search(sieveModel.searchTerm);

            var result = _sieveProcessor.Apply(sieveModel, games.AsQueryable());

            _logger.LogInformation("Retrieved {Count} games from database", games.Count);

            return Ok(result.ToList());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing GET request to /game/search endpoint");
            // ...
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("game/{id}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            _logger.LogInformation("Received GET request to /game/{Id} endpoint", id);

            var game = await _gameService.Get(id);

            if (game == null)
            {
                _logger.LogInformation("Game with id: {Id} not found", id);

                return NotFound();
            }

            _logger.LogInformation("Retrieved game with id: {Id} from database", id);

            return Ok(game);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing GET request to /game/{Id} endpoint", id);
            // ...
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost("game/create")]
    public async Task<IActionResult> Post([FromBody] Game newGame)
    {
        try
        {
            _logger.LogInformation("Received POST request to /game endpoint");

            await _gameService.Create(newGame);

            _logger.LogInformation("Created new game with title: {Title}", newGame.Title);

            return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing POST request to /game endpoint");
            // ...
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPut("game/update/{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] Game updatedGame)
    {
        try
        {
            _logger.LogInformation("Received PUT request to /game/{Id} endpoint", id);

            await _gameService.Update(id, updatedGame);

            _logger.LogInformation("Updated game with id: {Id}", id);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing PUT request to /game/{Id} endpoint", id);
            // ...
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("game/delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            _logger.LogInformation("Received DELETE request to /game/{Id}", id);

            var gameToDelete = await _gameService.Get(id);

            if (gameToDelete == null)
            {
                _logger.LogInformation("Game with id: {Id} not found", id);

                return NotFound();
            }

            await _gameService.Delete(id);

            _logger.LogInformation("Deleted game with id: {Id}", id);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing DELETE request to /game/{Id} endpoint", id);
            // ...
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}