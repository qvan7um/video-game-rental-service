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
                        <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          label="Demo"
                          />
                          <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          label="Demo"
                          />
                        </ul>
                        <ul className='cards__items'>
                        {games.map(game =>
                          <div key={game.id}>
                          <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          />
                          </div>
                        )}
                        <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          label="Demo"
                          />
                          <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          label="Demo"
                          />
                        </ul>
                        <ul className='cards__items'>
                        {games.map(game =>
                          <div key={game.id}>
                          <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          />
                          </div>
                        )}
                        <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          label="Demo"
                          />
                          <CardItemS
                          src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
                          label="Demo"
                          />
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