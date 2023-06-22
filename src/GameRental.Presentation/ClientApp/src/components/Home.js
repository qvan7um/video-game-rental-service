import React, { Component } from 'react';
import HeroSection from './HeroSection';
import Footer from './Footer';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <HeroSection />
        <Footer />
      </div>
    );
  }
}