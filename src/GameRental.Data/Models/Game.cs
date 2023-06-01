using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GameRental.Data.Models
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; } = null!;

        public List<string> Genre { get; set; } = null!;

        public string Platform { get; set; } = null!;

        public List<string> Explore { get; set; } = null!;

        public DateTime ReleaseDate { get; set; }

        public List<string> Developer { get; set; } = null!;

        public string Publisher { get; set; } = null!;
        
        public string Description { get; set; } = null!;

        public string ESRBRating { get; set; } = null!;
    }
}