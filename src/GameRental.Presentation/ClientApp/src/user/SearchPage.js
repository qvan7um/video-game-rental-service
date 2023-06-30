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

  const navigate = useNavigate();
  const handleViewInfo = (gameId) => {
    navigate(`/info/${gameId}`);
  }
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      fetchGameData();
    }
  }, [searchQuery]);

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

  async function fetchGameData() {
    try {
      const response = await fetch('/api/games');
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
        </div>
      </div>
    </div>
  );
}
