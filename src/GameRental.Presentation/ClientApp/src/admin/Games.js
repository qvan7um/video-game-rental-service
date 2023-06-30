import React, { useState, useEffect } from 'react';
import './Games.css'
import '../App.css'
import Dropdown from '../components/Dropdown';
import DropdownSoft from '../components/DropdownSoft';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const suggestedGames = games.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    populateGameData();
  }, []);

  const handleEdit = (gameId) => {
    navigate(`/edit/${gameId}`);
  }

  const handleDelete = (gameId) => {
    swal({
      title: "Bạn có chắc muốn xóa game này?",
      text: "Khi xóa dữ liệu sẽ không được khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`api/game/delete/${gameId}`, { method: 'DELETE' })
          .then(() => {
            // Remove deleted game from games state
            setGames(games => games.filter(game => game.id !== gameId));
            // Reset selected game ID
            setSelectedGameId(null);
          });
      }
    });
  }
  const handleViewDetails = (gameId) => {
    navigate(`/detail/${gameId}`);
  }

  function renderGamesTable(games) {
    return (
      <div className='wrapper'>
        <div className='tb-wrapper'>
          <table className="tb" aria-labelledby="tableLabel">
            <thead className='tb-head'>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Genre</th>
                <th>Platform</th>
                <th>Explore</th>
                <th>Release Date</th>
                <th>Developer</th>
                <th>Publisher</th>
                <th>ESRB Rating</th>
              </tr>
            </thead>

              {suggestedGames.map(game =>
            <tbody className={selectedGameId === game.id ? 'selected-game tb-body' : 'tb-body'}>
                <tr key={game.id} onClick={() => setSelectedGameId(game.id)}>
                  <td><img className='img-games-page' src={game.boxArt}></img></td>
                  <td>{game.title}</td>
                  {/* <td>{game.genre.join(', ')}</td> */}
                  <td>{game.genre ? game.genre.join(', ') : ''}</td>
                  <td>{game.platform}</td>
                  <td>{game.explore.join(', ')}</td>
                  <td>{game.releaseDate}</td>
                  <td>{game.developer}</td>
                  <td>{game.publisher}</td>
                  <td>{game.esrbRating}</td>                 
                </tr>
            </tbody>
              )}
          </table>
        </div>
        <div className='btn-area'>
          <Link to="/addgame"><button className='button btn-add'>Thêm</button></Link>
          <div className='hide-btn'>
          {selectedGameId && (
        <>
          <button className='button btn-edit' onClick={() => handleEdit(selectedGameId)}>Sửa</button>
          <button className='button btn-detail' onClick={() => handleViewDetails(selectedGameId)}>Chi tiết</button>
          <button className='button btn-delete' onClick={() => handleDelete(selectedGameId)}>Xóa</button>
        </>
      )}
          </div>
        </div>
      </div>
    );
  }

  async function populateGameData() {
    try {
      const response = await fetch('api/games');
      const data = await response.json();
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderGamesTable(games);

  return (
    <div className='manage-container'>
      <form className='search-bar'>
        <button type='submit'><i className='fa fa-search bg-game'></i></button>
        <input type='text' placeholder='Tìm kiếm' onChange={e => setSearchQuery(e.target.value)}/>
      </form>
      <Dropdown Type={'filter'} Title={'Lọc'} content={[['Platform', 'PS5', 'PS4', 'NintendoS'],
      ['Genre', 'Action', 'RGP', 'Adventure'],
      ['Publisher', 'CapCom', 'Ubisort', 'Nintendo']]} />
      <DropdownSoft Type={'range'} Title={'Sắp xếp'} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']} />
      {contents}
    </div>
  );
}

export default Games;