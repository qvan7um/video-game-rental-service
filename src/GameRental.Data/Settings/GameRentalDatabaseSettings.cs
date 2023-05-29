namespace GameRental.Data.Settings
{
    public class GameRentalDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string GamesCollectionName { get; set; } = null!;
    }
}