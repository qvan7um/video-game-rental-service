import React from 'react'
import './Cards.css'


function CardItemBtn(props) {
  return (
    <div className='card-container'>
        <figure className='card-item-wrap'>
            <img src={props.src} alt="" onClick={props.imgOnClick}/>
        </figure>
        <div className='title-btn'>
            <h6 className='title'>{props.label}</h6>
            <button className='rent-btn' onClick={props.btnOnClick}>Thuê</button>
        </div> 
        
    </div>
  )
}

export default CardItemBtn;


//https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7