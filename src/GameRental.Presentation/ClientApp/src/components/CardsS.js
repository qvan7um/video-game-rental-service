// import React from 'react'
// import CardItemS from './CardItemS'
// import './CardsS.css'

// function Cards(games) {
//   return (
//     <div className='cards'>
//         <div className='cards__container'>

//                 <ul className='cards__items'>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                 </ul>
//                 <ul className='cards__items'>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                 </ul>
//                 <ul className='cards__items'>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                 </ul>
//                 <ul className='cards__items'>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                 </ul>
//                 <ul className='cards__items'>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                     <CardItemS/>
//                 </ul>
            
//         </div>
//     </div>
//   )
// }

// export default Cards

import React, { useState, useEffect } from 'react';
import CardItemS from './CardItemS'
import './CardsS.css'
import '../App.css'
import { useNavigate } from 'react-router-dom';

function Cards() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    populateGameData();
  }, []);

  const handleViewInfo = (gameId) => {
    navigate(`/info/${gameId}`);
  }

  function renderGamesInfo(games) {
    return (
      <div className='card-wrapper'>
                  <div className='cards'>
                    <div className='cards__container'>
                        <ul className='cards__items'>
                        {games.map(game =>
                          <div key={game.id}>
                          <CardItemS
                          src={game.boxArt}
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}

                          />
                          </div>
                        )}
                        </ul>
                        <ul className='cards__items'>
                        {games.map(game =>
                          <div key={game.id}>
                          <CardItemS
                          src={game.boxArt}
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          />
                          </div>
                        )}
                        </ul>
                        <ul className='cards__items'>
                        {games.map(game =>
                          <div key={game.id}>
                          <CardItemS
                          src={game.boxArt}
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          />
                          </div>
                        )}
                        </ul>
            </div>
        </div>
    </div>
    );
  }

  async function populateGameData() {
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderGamesInfo(games);

  return (
    <div className='manage-info-container'>
      {contents}
    </div>
  );
}

export default Cards;