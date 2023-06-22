import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CardsS from '../components/CardsS';
import './SearchPage.css';
import '../App.css';
import DropdownSoft from '../components/DropdownSoft';
import GameSuggestion from '../components/GameSuggestion';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  async function fetchSearchResults(query) {
    try {
      const response = await fetch(`/api/games/search?searchTerm=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('An error occurred while fetching search results:', error);
    }
  }

  return (
    <div className='search-page-container'>
      <SearchBar value={searchQuery} changeInput={e => setSearchQuery(e.target.value)} />
      {/* Render search results */}
      <GameSuggestion suggestions={searchResults}/>
      <div className='panellist-wrap'>
        <div className='panel-wrap'>
          <FilterPanel />
        </div>
        <div className='list-wrap'>
          <h6 className='filter-description'>#kết quả cho</h6>
          <div className='range-wrap'>
            <DropdownSoft Type={"range"} Title={"Sắp xếp"} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']} />
          </div>
          <div className='cards-wrap'>
            <CardsS />
          </div>
        </div>
      </div>
    </div>
  );
}