import React, { Component } from 'react';
import './Games.css'
import '../App.css'
import Dropdown from '../components/Dropdown';
import DropdownSoft from '../components/DropdownSoft';
import { Link } from 'react-router-dom';

export class Games extends Component {
  static displayName = Games.name;

  constructor(props) {
    super(props);
    this.state = { games: [], loading: true };
  }

  componentDidMount() {
    this.populateGameData();
  }

  static renderGamesTable(games) {
    return (
      <div className='tb-wrapper'>
      <table className="tb" aria-labelledby="tableLabel">
        <thead className='tb-head'>
          <tr>
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
        
        <tbody className='tb-body'>
          {games.map(game =>
            <tr key={game.id}>
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
          )}
        </tbody>
      </table>
        </div>
    );
  }

  render(games) {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Games.renderGamesTable(this.state.games);

    return (
      <div className='manage-container'>
        <form className='search-bar'>
          <button type='submit'><i className='fa fa-search bg-game'></i></button>
          <input type='text' placeholder='Tìm kiếm'/>
        </form>
        <Dropdown Type={'filter'} Title={'Lọc'} content={[['Platform' ,'PS5', 'PS4','NintendoS'],
                                                          ['Genre', 'Action','RGP','Adventure'],
                                                          ['Publisher','CapCom','Ubisort','Nintendo']]}/>
        <DropdownSoft Type={'range'} Title={'Sắp xếp'} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']}/>
        {/* <Chip
          label="Clickable Deletable"
          onClick={handleClick}
          onDelete={handleDelete}
        /> */}
        {contents}
        <div className='btn-area'>
          <Link to="/addgame"><button className='button btn-add'>Thêm</button></Link>
          <button className='button btn-delete'>Xóa</button>
          <button className='button btn-edit'>Sửa</button>
          <button className='button btn-detail'>Chi tiết</button>
        </div>
      </div>
    );
  } 
  
  async populateGameData() {
    try {
        const response = await fetch('/game');
        const data = await response.json();
        this.setState({ games: data, loading: false });
      } catch (error) {
          console.error('An error occurred while fetching data:', error);
      }
  }
}

export default Games;

