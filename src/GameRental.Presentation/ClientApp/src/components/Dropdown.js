import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown({Type, Title, content = []}) {
    const [isActive, setIsAtive] = useState(false);
    const [isActiveSub, setIsAtiveSub] = useState(false);
    let titleStyles = ['dropdown']
    if (Type == 'range') {
        titleStyles.push('right')}
  return (
    <div className={titleStyles.join(' ')}>
        <div className='dropdown-btn' onClick={e => setIsAtive(!isActive)}>{Title} <i className='fas fa-sort-down'/></div>
        {isActive && 
        <div className='dropdown-contents'>
            <div className='dropdown-item'>
                {content[0]}
            </div>
            <div className='dropdown-item' onClick={e => setIsAtiveSub(!isActiveSub)}>
                {content[1]}
                
            </div>
            <div className='dropdown-item'>
                {content[2]}
            </div>
        </div>}
    </div>
  )
}

export default Dropdown;