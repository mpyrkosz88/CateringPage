//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

//styles
import './Navbar.scss';

//components
import NavItem from '../NavItem/NavItem';

//actions
import * as actions from '../../store/actions/auth';

class Navbar extends Component {

  render() {

    let routes = [
      { link: "/menu", label: "Menu" },
    ]

    let authRoutes = [
      { link: "login", label: "Log In" },
      { link: "register", label: "Register" }
    ]

    switch (this.props.authRole) {
      case ('Admin'):
        routes = [
          { link: "/menu", label: "Menu" },
          { link: "/add", label: "Add product" },
          { link: "/edit", label: "Edit products" },
        ]
        authRoutes = [
          { link: "logout", label: "Log Out", click: true }
        ]
        break;
      case ('User'):
        routes = [
          { link: "/menu", label: "Menu" },
          { link: "/history", label: "Order history" },
          { link: "/cart", label: "Cart" },
        ]
        authRoutes = [
          { link: "logout", label: "Log Out", click: true }
        ]
        break;
      default:
        routes = [
          { link: "/menu", label: "Menu" },
        ]
        authRoutes = [
          { link: "login", label: "Log In" },
          { link: "register", label: "Register" }
        ]
    }

    return (
      <nav className="navigation">
        <Grid container justify="space-between" >
          <Grid>
            <ul>
              {routes.map(links => {
                return (
                  <NavItem link={links.link} active="active_link">
                    {links.label}
                  </NavItem>
                )
              })}
            </ul>
          </Grid>
          <Grid>
            <ul>
              {authRoutes.map(links => {
                return (
                  <NavItem link={links.link} active="active_link" click={links.click ? this.props.logOut : null}>
                    {links.label}
                  </NavItem>
                )
              })}
            </ul>
          </Grid>
        </Grid>
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    authRole: state.auth.authRole
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);