using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using Sieve.Attributes;

namespace GameRental.Data.Models
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; } = null!;

        [Sieve(CanFilter = true)]
        public List<string> Genre { get; set; } = null!;

        [Sieve(CanFilter = true)]
        public string Platform { get; set; } = null!;

        public List<string> Explore { get; set; } = null!;

        [Sieve(CanSort = true)]
        public DateTime ReleaseDate { get; set; }

        [Sieve(CanFilter = true)]
        public List<string> Developer { get; set; } = null!;

        [Sieve(CanFilter = true)]
        public string Publisher { get; set; } = null!;
        
        public string Description { get; set; } = null!;

        [Sieve(CanSort = true)]
        public string ESRBRating { get; set; } = null!;
    }
}