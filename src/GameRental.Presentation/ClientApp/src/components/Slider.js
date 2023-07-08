// import React, { useState } from 'react';
// import { SliderData } from './SliderData';
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

// const Slider = ({ slides }) => {
//   const [current, setCurrent] = useState(0);
//   const length = slides.length;

//   const nextSlide = () => {
//     setCurrent(current === length - 1 ? 0 : current + 1);
//   };

//   const prevSlide = () => {
//     setCurrent(current === 0 ? length - 1 : current - 1);
//   };

//   const goToSlide = (slidesIndex) => {
//     setCurrent(slidesIndex);
//   }

//   if (!Array.isArray(slides) || slides.length <= 0) {
//     return null;
//   }

//   return (
//     <section className='slider-container'>
//       <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
//       <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
//       {SliderData.map((slide, index) => {
//         return (
//           <div
//             className={index === current ? 'slide active' : 'slide'}
//             key={index}
//           >
//             {index === current && (
//               <img src={slide.image} alt='travelimage' className='image' />
//             )}
//           </div>
//         );
//       })}
//       <div className='dots-container'>
//         {SliderData.map((slide, slidesIndex) => (
//           <div key={slidesIndex} className={`dot-styles ${current === slidesIndex ? 'selected' : ''}`}  onClick={() => goToSlide(slidesIndex)}>.</div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Slider;

import React, { useState, useEffect } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Slider({ slides }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    populateGameData();
  }, []);

  const handleViewInfo = (gameId) => {
    navigate(`/info/${gameId}`);
  }

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (slidesIndex) => {
    setCurrent(slidesIndex);
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  function renderGamesInfo(games) {
    return (
      <section className='slider-container'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        {SliderData.map((slide, index) => {
          const game = games.find(game => game.title === slide.gameTitle);
          return (
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
              onClick={() => handleViewInfo(game.id)}
            >
              {index === current && (
                <img src={slide.image} alt='travelimage' className='image' />
              )}
            </div>
          );
        })}
        <div className='dots-container'>
          {SliderData.map((slide, slidesIndex) => (
            <div key={slidesIndex} className={`dot-styles ${current === slidesIndex ? 'selected' : ''}`}  onClick={() => goToSlide(slidesIndex)}>.</div>
          ))}
        </div>
      </section>
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

export default Slider;


// function renderGamesInfo(games) {
//   return (
//     <section className='slider-container'>
//     <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
//     <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
//     {SliderData.map((slide, index) => {
//       return (
//         <div
//           className={index === current ? 'slide active' : 'slide'}
//           key={index}
//         >
//           {index === current && (
//             <img src={slide.image} alt='travelimage' className='image' />
//           )}
//         </div>
//       );
//     })}
//     <div className='dots-container'>
//       {SliderData.map((slide, slidesIndex) => (
//         <div key={slidesIndex} className={`dot-styles ${current === slidesIndex ? 'selected' : ''}`}  onClick={() => goToSlide(slidesIndex)}>.</div>
//       ))}
//     </div>
//   </section>
//   );
// }
