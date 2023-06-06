using GameRental.Data.Models;
using GameRental.Logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameRental.Presentation.Controllers;

[ApiController]
[Route("[controller]")]
public class ContractController : ControllerBase
{
    private readonly ContractService _contractService;
    private readonly ILogger<ContractController> _logger;

    public ContractController(ContractService contractService, ILogger<ContractController> logger)
    {
        _contractService = contractService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<List<Contract>> Get()
    {
        _logger.LogInformation("Received GET request to /contract endpoint");

        var contracts = await _contractService.Get();

        _logger.LogInformation("Retrieved {Count} contracts from database", contracts.Count);

        return contracts;
    }
}