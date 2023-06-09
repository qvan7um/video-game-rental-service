import React, { Component } from 'react';
import './Explore.css';
import '../App.css';
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

export class Explore extends Component {
  static displayName = Explore.name;

  render() {
    return (
      <div>
        <Slider slides={SliderData}/>;
         <div className='explore-cards'>
          <div className='explore-cards-container'>
            <div className='explore-cards-wrapper'>
            <h2>Nổi bật</h2>
              <ul className='explore-cards-items'>
                
                  <Cards />
              </ul>
              <h2>Mới</h2>
              <ul className='explore-cards-items'>
                
                  <Cards />
              </ul>
              <h2>Sắp ra mắt</h2>
              <ul className='explore-cards-items'>
                
                  <Cards />
              </ul>
              <button className='search-btn'>Xem tất cả</button>
            </div>
          </div>

         </div>
        <Footer />;
     </div>
    );
  }
}
          
          
          
          <Cards />;
         <Cards />;
         <Cards />;
         <Cards />;