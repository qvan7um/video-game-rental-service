import React from 'react'
import './Cards.css'
import { Link } from 'react-router-dom'


function CardItem() {
  return (
    <div className='card-container'>
        
            <img src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" alt=""/>
        <div className='title-btn'>
            <h7 className='title'>God Of War</h7>
            <button className='rent-btn' tag={Link} to='/rent'>Thuê</button>
        </div> 
        
    </div>
  )
}

export default CardItem