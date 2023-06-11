import React from 'react'
import CardItemS from './CardItemS'
import './CardsS.css'

function Cards(games) {
  return (
    <div className='cards'>
        <div className='cards__container'>

                <ul className='cards__items'>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                </ul>
                <ul className='cards__items'>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                </ul>
                <ul className='cards__items'>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                </ul>
                <ul className='cards__items'>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                </ul>
                <ul className='cards__items'>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                    <CardItemS/>
                </ul>
            
        </div>
    </div>
  )
}

export default Cards