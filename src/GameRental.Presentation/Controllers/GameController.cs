using GameRental.Data.Models;
using GameRental.Logic.Services;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace GameRental.Presentation.Controllers;

[ApiController]
[Route("[controller]")]
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

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] ParameterModel sieveModel)
    {
        _logger.LogInformation("Received GET request to /game endpoint");

        var games = await _gameService.Search(sieveModel.searchTerm);
        var result = _sieveProcessor.Apply(sieveModel, games.AsQueryable());

        _logger.LogInformation("Retrieved {Count} games from database", games.Count);

        return Ok(result.ToList()) ;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
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

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Game newGame)
    {
        _logger.LogInformation("Received POST request to /game endpoint");

        await _gameService.Create(newGame);

        _logger.LogInformation("Created new game with title: {Title}", newGame.Title);

        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] Game updatedGame)
    {
        _logger.LogInformation("Received PUT request to /game/{Id} endpoint", id);

        await _gameService.Update(id, updatedGame);

        _logger.LogInformation("Updated game with id: {Id}", id);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id){
        try{
            var gameToDelete = await _gameService.Get(id);

            if (gameToDelete == null){
                _logger.LogInformation("Game with id: {Id} not found", id);
            }
            else await _gameService.Delete(id);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error deleting data");
        }
        return NoContent();
    }
}