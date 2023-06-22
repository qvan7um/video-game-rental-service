import React, { useState } from 'react';
import './Dropdown.css';

function DropdownCtr({Type, Title, content = [][100]}) {
    const [isActive, setIsAtive] = useState(false);
    const [isActiveChip, setIsAtiveChip] = useState(false);
    const [buttonText, setButtonText] = useState("");
        
    const showChip = (value) => {
        setIsAtive(false);
        setIsAtiveChip(true);
        setButtonText(value);
    };
    let titleStyles = ['dropdown']
    if (Type === 'range') {
        titleStyles.push('right')}
  return (
    <div className={titleStyles.join(' ')}>
        <div className='dropdown-btn' onClick={e => setIsAtive(!isActive)}>{Title} <i className='fas fa-sort-down'/></div>
        {isActive && 
        <div className='dropdown-contents'>
            <div className='dropdown-item' onClick={e => showChip(content[0])}>
                {content[0]}
            </div>
            <div className='dropdown-item' onClick={e => showChip(content[1])}>
                {content[1]}
            </div>
            <div className='dropdown-item' onClick={e => showChip(content[2])}>
                {content[2]}
            </div>
            <div className='dropdown-item' onClick={e => showChip(content[3])}>
                {content[3]}
            </div>
            <div className='dropdown-item' onClick={e => showChip(content[4])}>
                {content[4]}
            </div> 
        </div>}
        {isActiveChip &&
        <div className='chip' onClick={e => setIsAtiveChip(!isActiveChip)}>
            <button className='chip-btn' id="chipcontract">{buttonText}<i className='fa fa-times'/></button>
        </div>}
    </div>
  )
}

export default DropdownCtr;