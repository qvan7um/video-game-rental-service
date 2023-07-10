import { useState } from 'react';
import React from 'react'
import './FilterPanel.css'

function FilterPanel() {
  const [activeChips, setActiveChips] = useState([]);
  const showChip = (value) => {
    setActiveChips([...activeChips, value]);
  };
  const removeChip = (index) => {
    setActiveChips(activeChips.filter((_, i) => i !== index));
  };
  return (
    <div className='filter-container'>
      <h6 className='filter'>Lọc</h6>
      <div className='chip-container'>
        {activeChips.map((chip, index) => (
          <div className='chip' onClick={() => removeChip(index)}>
            <button className='chip-btn'>{chip}<i className='fa fa-times'/></button>
          </div>
        ))}
      </div>
      <div className='filter-platform'>
        <h6>Nền tảng</h6>
        <input id='ch-pf' type='checkbox'/>
        <ul className='filter-item'>
          <li onClick={e => showChip("PlayStation 5")}>PlayStation 5</li>
          <li onClick={e => showChip("PlayStation 4")}>PlayStation 4</li>
          <li onClick={e => showChip("PlayStation 3")}>PlayStation 3</li>
        </ul>
        <ul className='more-pf filter-item'>
          <li onClick={e => showChip("Xbox Series X")}>Xbox Series X</li>
          <li onClick={e => showChip("Xbox One")}>Xbox One</li>
          <li onClick={e => showChip("Nintendo Switch")}>Nintendo Switch</li>
          <label for='ch-pf'>Ẩn</label>
        </ul>
        <label for='ch-pf'>Xem thêm</label>
      </div>
      <div className='filter-genre'>
        <h6>Genre</h6>
        <input id='ch-g' type='checkbox'/>
        <ul className='filter-item'>
          <li onClick={e => showChip("Action")}>Action</li>
          <li onClick={e => showChip("Adventure")}>Adventure</li>
          <li onClick={e => showChip("RPG")}>RPG</li>
        </ul>
        <ul className='more-g filter-item'>
          <li onClick={e => showChip("Racing")}>Racing</li>
          <li onClick={e => showChip("Sports")}>Sports</li>
          <li onClick={e => showChip("Indie")}>Indie</li>
          <label for='ch-g'>Ẩn</label>
        </ul>
        <label for='ch-g'>Xem thêm</label>
      </div>
      <div className='filter-tag'>
        <h6>Thẻ</h6>
        <input id='ch-t' type='checkbox'/>
          <ul className='filter-item'>
          <li onClick={e => showChip("Action")}>Action</li>
          <li onClick={e => showChip("Adventure")}>Adventure</li>
          <li onClick={e => showChip("RPG")}>RPG</li>
          </ul>
          <ul className='more-t filter-item'>
          <li onClick={e => showChip("Racing")}>Racing</li>
          <li onClick={e => showChip("Sports")}>Sports</li>
          <li onClick={e => showChip("Indie")}>Indie</li>
          <label for='ch-t'>Ẩn</label>
        </ul>
        <label for='ch-t'>Xem thêm</label>
      </div>
      <div className='filter-rating'>
        <h6>Chia loại (Rating)</h6>
          <input id='ch-r' type='checkbox'/>
          <ul className='filter-item'>
            <li onClick={e => showChip("Trẻ vị thành niên")}>Trẻ vị thành niên</li>
            <li onClick={e => showChip("Mọi người")}>Mọi người</li>
            <li onClick={e => showChip("18+")}>18+</li>
          </ul>
          <ul className='more-r filter-item'>
          
          <label for='ch-r'>Ẩn</label>
        </ul>
        <label for='ch-r'>Xem thêm</label>
      </div>
      <div className='filter-publisher'>
        <h6>Nhà phát hành</h6>
          <input id='ch-p' type='checkbox'/>
          <ul className='filter-item'>
            <li onClick={e => showChip("Nis Ameria")}>Nis Ameria</li>
            <li onClick={e => showChip("Sony")}>Sony</li>
            <li onClick={e => showChip("Atari")}>Atari</li>
          </ul>
          <ul className='more-p filter-item'>
            <li onClick={e => showChip("Ubisoft")}>Ubisoft</li>
            <li onClick={e => showChip("Capcom")}>Capcom</li>
            <li onClick={e => showChip("Namco")}>Namco</li>
            <label for='ch-p'>Ẩn</label>
          </ul>
          <label for='ch-p'>Xem thêm</label>
      </div>
    </div>
  )
}

export default FilterPanel