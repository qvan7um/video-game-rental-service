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
    public async Task<IActionResult> Get([FromQuery]SieveModel sieveModel)
    {
        _logger.LogInformation("Received GET request to /game endpoint");

        var games = await _gameService.Get();
        var result = _sieveProcessor.Apply(sieveModel, games.AsQueryable());

        _logger.LogInformation("Retrieved {Count} games from database", games.Count);

        return Ok(result.ToList()) ;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Game newGame)
    {
        _logger.LogInformation("Received POST request to /game endpoint");

        await _gameService.Create(newGame);

        _logger.LogInformation("Created new game with title: {Title}", newGame.Title);

        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }
}