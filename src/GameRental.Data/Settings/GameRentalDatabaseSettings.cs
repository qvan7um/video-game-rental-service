namespace GameRental.Data.Settings
{
    public class GameRentalDatabaseSettings
    {
        public string? ConnectionString { get; set; }

        public string? DatabaseName { get; set; }

        public string? GamesCollectionName { get; set; }

        public string? ContractsCollectionName {get; set; }

        public string? AccountsCollectionName { get; set; }
    }
}