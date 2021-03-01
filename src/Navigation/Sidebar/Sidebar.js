//libraries
import React, { Component } from 'react';

//components
import NavItem from '../NavItem/NavItem';

class Sidebar extends Component {

  render() {

    let routes = [
      { link: "/menu/sandwiches", label: "Sandwiches" },
      { link: "/menu/tortillas", label: "Tortillas" },
      { link: "/menu/yoghurts", label: "Yogurths" },
      { link: "/menu/desserts", label: "Desserts" },
      { link: "/menu/breakfasts", label: "Breakfasts" },
      { link: "/menu/salads", label: "Salads" },
      { link: "/menu/lunches", label: "Lunches" },
      { link: "/menu/pastas", label: "Pastas" },
      { link: "/menu/sushi", label: "Sushi" },
      { link: "/menu/drinks", label: "Drinks" },
    ]
    return (
      <nav className="sidebar">
            <ul>
              {routes.map((links, index) => {
                return (
                  <NavItem key={index} link={links.link} active="active_link">
                  {links.label}
                  </NavItem>
                )
              })}
            </ul>
      </nav>
    )
  }
}

export default Sidebar;