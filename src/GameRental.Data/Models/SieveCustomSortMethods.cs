
using GameRental.Data.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Sieve.Models;
using Sieve.Services;

namespace GameRental.Data.Models;

public class SieveCustomSortMethods : ISieveCustomSortMethods
{

    private readonly IMongoCollection<Contract> _contractsCollection;

    public SieveCustomSortMethods(IMongoClient mongoClient, IOptions<GameRentalDatabaseSettings> settings)
    {
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);

        _contractsCollection = mongoDatabase.GetCollection<Contract>(settings.Value.ContractsCollectionName);
    }


    public IQueryable<Game> Popularity(IQueryable<Game> source, bool useThenBy, bool desc)  
    {
        var result = useThenBy ?
            ((IOrderedQueryable<Game>)source).ThenBy(p => GetContractCountByGame(p)) : 
            source.OrderBy(p => GetContractCountByGame(p));

        return result; 
    }

    public int GetContractCountByGame(Game game)
    {
        var res = _contractsCollection.AsQueryable()
            .Where(c => c.GameId == game.Id)
            .Count();

        return res;
    }


}