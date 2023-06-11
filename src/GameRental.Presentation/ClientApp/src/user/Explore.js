import React, { Component } from 'react';
import './Explore.css';
import '../App.css';
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
// import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
// import { Link } from 'react-router-dom';


// export class ExploreNav extends Component {
//   static displayName = ExploreNav.name;

//   constructor (props) {
//     super(props);

//     this.toggleNavbar = this.toggleNavbar.bind(this);
//     this.state = {
//       collapsed: true
//     };
//   }

//   toggleNavbar () {
//     this.setState({
//       collapsed: !this.state.collapsed
//     });
//   }

//   render() {
//     return (
//       <header>
//         <Navbar className="nav navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
//           <NavbarBrand className='navbar-logo' tag={Link} to="/">GameRental</NavbarBrand>
//           <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//           <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//             <ul className="navbar-nav flex-grow">
//               <NavItem>
//                 <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink tag={Link} className="text-light" to="/counter"></NavLink>
//               </NavItem>
//             </ul>
//           </Collapse>
//         </Navbar>
//       </header>
//     );
//   }
// }

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