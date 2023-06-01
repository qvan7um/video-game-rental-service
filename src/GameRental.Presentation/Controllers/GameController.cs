using GameRental.Data.Models;
using GameRental.Logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameRental.Presentation.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly GameService _gameService;
    private readonly ILogger<GameController> _logger;

    public GameController(GameService gameService, ILogger<GameController> logger)
    {
        _gameService = gameService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<List<Game>> Get()
    {
        _logger.LogInformation("Received GET request to /game endpoint");

        var games = await _gameService.Get();

        _logger.LogInformation("Retrieved {Count} games from database", games.Count);

        return games;
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