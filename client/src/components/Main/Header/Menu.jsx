import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import './menu.css';

class Menu extends Component {
  render() {
    let navItems = [
      { path: '/', name: 'Home' },
      { path: '/login', name: 'Login' },
      { path: '/register', name: 'Register' },
    ];
    if(this.props.serverRes.connected) { 
      navItems = [
        { path: '/userhome', name: 'Home' },
        { path: '/browse', name: 'Browse' }, 
        { path: '/profile', name: 'Profile' }, 
        { path: '/about', name: 'About' },
      ];
    }
    // Get the current location of the APP so I can check against <Link> path
    const currentLocation = this.props.location.pathname;
    // To move Menu item into a new file/component
    return (
      <ul className="navBar">
        {navItems.map((element, i) => (
          <li className="navLi" key={i}>
            <Item
              to={element.path}
              name={element.name}
              current={currentLocation}
            />
          </li>
        ))}
        <SignOut 
          isLogged={this.props.serverRes.connected}
          signOut={this.props.signOut}
        />
      </ul>
    );
  }
}

//Move to a new file.
const SignOut = props => {
  if(props.isLogged){
    return (<li onClick={props.signOut} className='navLi sign_out'>Sign Out</li>);
  }
  return null;
}
const Item = props => (
  <Link
    className={classNames('navItem', { active: props.current === props.to })}
    to={props.to}
  >
    {props.name}
  </Link>
);

//In oder to use withRouter the component has to be wrapped in it
export default withRouter(Menu);
