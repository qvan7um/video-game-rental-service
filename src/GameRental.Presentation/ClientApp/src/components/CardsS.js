import React from 'react'
import CardItem from './CardItemS'
import './CardsS.css'

function Cards(games) {
  return (
    <div className='cards'>
        <div className='cards__container'>

                <ul className='cards__items'>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ul>
                <ul className='cards__items'>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ul>
                <ul className='cards__items'>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ul>
                <ul className='cards__items'>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ul>
                <ul className='cards__items'>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ul>
            
        </div>
    </div>
  )
}

export default Cards