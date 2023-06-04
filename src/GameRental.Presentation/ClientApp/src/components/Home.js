import React, { Component } from 'react';
import HeroSection from './HeroSection';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <HeroSection />
      </div>
    );
  }
}
