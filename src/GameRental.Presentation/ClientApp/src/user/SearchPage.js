import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CardItemS from '../components/CardItemS';
import './SearchPage.css';
import '../App.css';
import DropdownSoft from '../components/DropdownSoft';
import GameSuggestion from '../components/GameSuggestion';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const gameSuggestionRef = useRef(null);
  const [page, setPage] =useState(1);
  const navigate = useNavigate();
  const handleViewInfo = (gameId) => {
    navigate(`/info/${gameId}`);
  }
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery, page);
    } else {
      fetchGameData(page);
    }
  }, [searchQuery, page]);
  

  useEffect(() => {
    setShowSuggestions(!!searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (gameSuggestionRef.current && !gameSuggestionRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  }
  async function fetchSearchResults(query) {
    try {
      const response = await fetch(`/api/games/search?searchTerm=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('An error occurred while fetching search results:', error);
    }
  }

  async function fetchGameData(page = 1) {
    try {
      const response = await fetch(`/api/games?page=${page}&pageSize=25`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('An error occurred while fetching game data:', error);
    }
  }
  

  return (
    <div className='search-page-container'>
      <SearchBar value={searchQuery} changeInput={e => setSearchQuery(e.target.value)} />
      {/* Render search results */}
      {showSuggestions && (
        <div ref={gameSuggestionRef}>
          <GameSuggestion suggestions={searchResults} />
        </div>
      )}
      <div className='panellist-wrap'>
        <div className='panel-wrap'>
          <FilterPanel />
        </div>
        <div className='list-wrap'>
          <div className='range-wrap'>
          <h6 className='filter-description'>#kết quả cho</h6>
            <DropdownSoft className='dropdown-soft' Type={"range"} Title={"Sắp xếp"} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']} />
          </div>
          <div className='cards-wrap'>
            {searchResults.map(game => (
              <div key={game.id} onClick={() => handleViewInfo(game.id)}>
                <CardItemS src={game.boxArt} label={game.title} />
              </div>
            ))}
          </div>
          <div className='page-btn'>
              <button className='next-page-btn' onClick={() => setPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)}><i className='fa fa-angle-left'></i></button>
              <button className='previous-page-btn' onClick={() => setPage(page + 1)}><i className='fa fa-angle-right'></i></button>
              <p className='page-number'>Page{page}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
