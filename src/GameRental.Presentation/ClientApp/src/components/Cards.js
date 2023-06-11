import React from 'react'
import CardItemBtn from './CardItemBtn'
import './Cards.css'

function Cards(games) {
  return (
    <div className='cards'>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                    <CardItemBtn/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards