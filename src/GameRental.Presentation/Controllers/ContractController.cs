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

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        _logger.LogInformation("Received GET request to /contract/{Id} endpoint", id);

        var contract = await _contractService.Get(id);

        if (contract == null)
        {
            _logger.LogInformation("Contract with id: {Id} not found", id);
            return NotFound();
        }

        _logger.LogInformation("Retrieved contract with id: {Id} from database", contract.Id);

        return Ok(contract);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Contract newContract)
    {
        await _contractService.Create(newContract);

        return CreatedAtAction(nameof(Get), new { id = newContract.Id }, newContract);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] Contract updatedContract)
    {
        await _contractService.Update(id, updatedContract);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var contractToDelete = await _contractService.Get(id);

        if (contractToDelete == null)
        {
            return NotFound();
        }

        await _contractService.Delete(id);

        return NoContent();
    }
}