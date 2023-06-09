import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards(games) {
  return (
    <div className='cards'>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards