//libraries
import React, { Component } from 'react';

//components
import NavItem from '../NavItem/NavItem';

class Sidebar extends Component {

  render() {

    let routes = [
      { link: "/menu/kanapki", label: "Kanapki" },
      { link: "/menu/tortille", label: "Tortille" },
      { link: "/menu/jogurty", label: "Jogurty" },
      { link: "/menu/desery", label: "Desery" },
      { link: "/menu/sniadania", label: "Śniadania" },
      { link: "/menu/salaty", label: "Sałaty" },
      { link: "/menu/lancze", label: "Lancze" },
      { link: "/menu/makarony", label: "Makarony" },
      { link: "/menu/sushi", label: "Sushi" },
      { link: "/menu/napoje", label: "Napoje" },
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