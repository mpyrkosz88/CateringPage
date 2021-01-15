//libraries
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavItem extends Component {
  render() {
    return (
      <li>
        <NavLink
          to={this.props.link}
          activeClassName={this.props.active}
          onClick={this.props.click}
        >
          {this.props.children}
        </NavLink>
      </li>
    )
  }
}

export default NavItem;