import React, { Component } from 'react';
import './Explore.css';
import '../App.css';
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { Link } from 'react-router-dom';

export class Explore extends Component {
  static displayName = Explore.name;

  render() {
    return (
      <div className='explore-page'> 
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
              <Link to='/search'><button className='search-btn'>Xem tất cả</button></Link>
            </div>
          </div>
         </div>
        <Footer />;
     </div>
    );
  }
}