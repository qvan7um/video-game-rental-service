using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GameRental.Data.Models
{
    public class Account
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Role { get; set; } = null!; // can be either "User" or "Admin"

        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;

        public List<string>? ContractsIds { get; set; }

        public float? Points { get; set; }

        public Account()
        {
            Points = 0.0f;
        }
    }
}