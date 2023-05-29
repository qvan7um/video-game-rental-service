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

        [BsonElement("Title")]
        public string Title { get; set; } = null!;

        [BsonElement("Genre")]
        public List<string> Genre { get; set; } = null!;

        [BsonElement("Platform")]
        public string Platform { get; set; } = null!;
    }
}