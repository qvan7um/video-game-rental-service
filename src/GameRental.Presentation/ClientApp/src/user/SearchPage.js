import React from 'react'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import CardsS from '../components/CardsS'
import './SearchPage.css';
import '../App.css'
import DropdownSoft from '../components/DropdownSoft'

export default function SearchPage() {
  return (
    <div className='search-page-container'>
        <SearchBar />
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
  )
};

