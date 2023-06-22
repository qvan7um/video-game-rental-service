import React from 'react'
import './CardsS.css'


function CardItem(props) {
  return (
    <div className='card-container'>
        <figure className='card-item-wrap'>
            <img src={props.src} alt="" onClick={props.imgOnClick}/>
        </figure>
        <div className='title-btn'>
            <h7 className='title'>{props.label}</h7>  
        </div> 
        
    </div>
  )
}

export default CardItem