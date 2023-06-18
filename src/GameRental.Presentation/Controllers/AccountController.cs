using GameRental.Data.Models;
using GameRental.Logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameRental.Presentation.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;
    private readonly ILogger<AccountController> _logger;

    public AccountController(AccountService accountService, ILogger<AccountController> logger)
    {
        _accountService = accountService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            _logger.LogInformation("Received GET request to /account endpoint");

            var accounts = await _accountService.Get();

            _logger.LogInformation("Retrieved {Count} accounts from database", accounts.Count);

            return Ok(accounts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing GET request to /account endpoint");

            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            _logger.LogInformation("Received GET request to /accound/{Id} endpoint", id);

            var account = await _accountService.Get(id);

            if (account == null)
            {
                _logger.LogInformation("Account with id: {Id} not found", id);

                return NotFound();
            }

            _logger.LogInformation("Retrieved account with id: {Id} from database", account.Id);

            return Ok(account);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing GET request to /account/{Id} endpoint", id);

            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Account newAccount)
    {
        try
        {
            _logger.LogInformation("Received POST request to /account endpoint");

            await _accountService.Create(newAccount);

            _logger.LogInformation("Created new account with id: {Id}", newAccount.Id);

            return CreatedAtAction(nameof(Get), new { id = newAccount.Id}, newAccount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing POST request to /account endpoint");

            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] Account updatedAccount)
    {
        try
        {
            _logger.LogInformation("Received PUT request to /account/{Id} endpoint", id);

            await _accountService.Update(id, updatedAccount);

            _logger.LogInformation("Updated account with id: {Id}", updatedAccount.Id);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing PUT request to /account/{Id} endpoint", id);

            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            _logger.LogInformation("Received DELETE request to /account/{Id} endpoint", id);

            var accountToDelete = _accountService.Get(id);

            if (accountToDelete == null)
            {
                _logger.LogInformation("Account with id: {Id} not found", id);

                return NotFound();
            }

            await _accountService.Delete(id);

            _logger.LogInformation("Deleted account with id: {Id}", id);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occured while processing DELETE request to /account/{Id} endpoint", id);

            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}