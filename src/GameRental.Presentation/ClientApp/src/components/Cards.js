// import React from 'react'
// import CardItemBtn from './CardItemBtn'
// import './Cards.css'

// function Cards(games) {
//   return (
//     <div className='cards'>
//         <div className='cards__container'>
//             <div className='cards__wrapper'>
//                 <ul className='cards__items'>
//                     <CardItemBtn
//                     src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" 
//                     label="God Of War"
//                     text="Thuê"
//                     />
                    
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                     <CardItemBtn/>
//                 </ul>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Cards


import React, { useState, useEffect } from 'react';
import CardItemBtn from './CardItemBtn'
import './Cards.css'
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
  const handleRentGame = (gameId) => {
    navigate(`/rent/${gameId}`);
  }
console.log(games);
const featuredGames = games.filter(game => game.explore && game.explore.includes("Featured"));
const currentDate = new Date();
const oneMonthAgo = new Date(new Date().setMonth(currentDate.getMonth() - 1));

const newReleaseGames = games.filter(game => {
  if (game.releaseDate) {
    const releaseDate = new Date(game.releaseDate);
    return releaseDate >= oneMonthAgo && releaseDate <= currentDate;
  }
  return false;
});

const comingSoonGames = games.filter(game => {
  if (game.releaseDate) {
    const releaseDate = new Date(game.releaseDate);
    return releaseDate > currentDate;
  }
  return false;
});

  function renderGamesInfo(games) {
    return (
      <div className='card-wrapper'>
                  <div className='cards'>
                    <div className='cards__container'>
                        <h2>Featured</h2>
                        <ul className='card__items'>
                        {featuredGames.map(game =>
                          <div key={game.id}>
                          <CardItemBtn
                          src={game.boxArt}
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          btnOnClick={() => handleRentGame(game.id)}
                          />
                          </div>
                        )}
                        </ul>
                    </div>
                    <div className='cards__container'>
                        <h2>New Release</h2>
                        <ul className='card__items'>
                        {newReleaseGames.map(game =>
                          <div key={game.id}>
                          <CardItemBtn
                          src={game.boxArt}
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          btnOnClick={() => handleRentGame(game.id)}
                          />
                          </div>
                        )}
                        </ul>
                    </div>
                    <div className='cards__container'>
                        <h2>Coming soon</h2>
                        <ul className='card__items'>
                        {comingSoonGames.map(game =>
                          <div key={game.id}>
                          <CardItemBtn
                          src={game.boxArt}
                          imgOnClick={() => handleViewInfo(game.id)} 
                          label={game.title}
                          btnOnClick={() => handleRentGame(game.id)}
                          />
                          </div>
                        )}
                        </ul>
                    </div>
        </div>
    </div>
    );
  }

  // async function populateGameData() {
  //   try {
  //     const response = await fetch('/api/games');
  //     const data = await response.json();
  //     setGames(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('An error occurred while fetching data:', error);
  //   }
  // }

  async function populateGameData() {
    try {
      let allGames = [];
      let page = 1;
      let hasMoreData = true;
  
      while (hasMoreData) {
        const response = await fetch(`/api/games?page=${page}`);
        const data = await response.json();
        allGames = [...allGames, ...data];
        if (data.length === 0) {
          hasMoreData = false;
        } else {
          page++;
        }
      }
  
      setGames(allGames);
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

