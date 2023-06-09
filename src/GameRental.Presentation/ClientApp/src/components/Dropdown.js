import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown({Type, Title, content = [][100]}) {
    const [isActive, setIsAtive] = useState(false);
    const [isActiveSubGenre, setIsAtiveSubGenre] = useState(false);
    const [isActiveSubP, setIsAtiveSubP] = useState(false);
    const [isActiveSubPF, setIsAtiveSubPF] = useState(false);
    const [isActiveChip, setIsAtiveChip] = useState(false);
    const [buttonTexts, setButtonTexts] = useState([]);

    
    var value='';
    const removeChip = (index) => {
        setButtonTexts(buttonTexts.filter((_, i) => i !== index));
    };
    
    const showChip = (value) => {
        setIsAtiveSubGenre(false);
        setIsAtiveSubP(false);
        setIsAtiveSubPF(false);
        setIsAtive(false);
        setIsAtiveChip(true);
        if (!buttonTexts.includes(value)) {
            setButtonTexts([...buttonTexts, value]);
        }
    };
    let titleStyles = ['dropdown']
    if (Type === 'range') {
        titleStyles.push('right')}
  return (
    <div className={titleStyles.join(' ')}>
        <div className='dropdown-btn' onClick={e => setIsAtive(!isActive)}>{Title} <i className='fas fa-sort-down'/></div>
        {isActive && 
        <div className='dropdown-contents'>
            <div className='dropdown-item' onClick={e => setIsAtiveSubPF(!isActiveSubPF)}>
                {content[0][0]}
            </div>
            {isActiveSubPF &&
                <div className='sub-dropdown-contents'>
                    <div className='dropdown-item' onClick={e => showChip(content[0][1])}>
                        {content[0][1]}
                    </div>
                    <div className='dropdown-item' onClick={e => showChip(content[0][2])}>
                        {content[0][2]}
                
                    </div>
                    <div className='dropdown-item' onClick={e => showChip(content[0][3])}>
                        {content[0][3]}
                    </div>
                </div>}
            <div className='dropdown-item' onClick={e => setIsAtiveSubGenre(!isActiveSubGenre)}>
                {content[1][0]}
                
            </div>{isActiveSubGenre &&
                <div className='sub-dropdown-contents'>
                    <div className='dropdown-item' onClick={e => showChip(content[1][1])}>
                        {content[1][1]}
                    </div>
                    <div className='dropdown-item' onClick={e => showChip(content[1][2])}>
                        {content[1][2]}
                
                    </div>
                    <div className='dropdown-item' onClick={e => showChip(content[1][3])}>
                        {content[1][3]}
                    </div>
                </div>}
            <div className='dropdown-item'  onClick={e => {setIsAtiveSubP(!isActiveSubP) && (value=content[0][1])}}>
                {content[2][0]}
            </div>
                {isActiveSubP &&
                <div className='sub-dropdown-contents'>
                    <div className='dropdown-item' onClick={e => showChip(content[2][1])}>
                        {content[2][1]}
                    </div>
                    <div className='dropdown-item' onClick={e => showChip(content[2][2])}>
                        {content[2][2]}
                
                    </div>
                    <div className='dropdown-item' onClick={e => showChip(content[2][3])}>
                        {content[2][3]}
                    </div>
                </div>}
        </div>}
        <div className='chip-wrapper'>
            {isActiveChip &&
            buttonTexts.map((text, index) => (
                <div key={text} className='chip' onClick={e => removeChip(index)}>
                <button className='chip-btn'>{text}<i className='fa fa-times'/></button>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Dropdown;
