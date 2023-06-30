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
         <div className='explore-cards-wrap'>
          <Cards/>
          <Link to='/search'><button className='search-btn'>Xem tất cả</button></Link>
         </div>
        <Footer />;
     </div>
    );
  }
}
