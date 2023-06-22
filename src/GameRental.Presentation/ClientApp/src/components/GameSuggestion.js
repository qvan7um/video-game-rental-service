import './GameSuggestion.css';

function GameSuggestion({ suggestions }) {
    return (
      <div className="game-suggestion-container">
        <h1 className="temp"></h1>
        <ul className="game-suggestion">
          {suggestions.map(game => (
            <li className="game-suggestion-item" key={game.id}>
              <h5 className="game-suggestion-title">
                {game.title}
              </h5>
              <p className="game-suggestion-genre">
                Thể loại: {game.genre}
              </p>
              <p className="game-suggestion-platform">
                Nền tảng: {game.platform}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default GameSuggestion;