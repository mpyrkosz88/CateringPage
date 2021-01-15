//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

//components
import NavItem from '../NavItem/NavItem';

//actions
import * as actions from '../../store/actions/auth';

class Navbar extends Component {

    state = {
      isOpen: false,
    }

    openMenu = () => {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }

    logOut = () => {
      this.openMenu();
      this.props.logOut()
    }

  render() {

    const menu = this.state.isOpen ? null : "hideMenu"

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
          { link: "/users_history", label: "Users history" },
          { link: "/orders_history", label: "Orders history" },
        ]
        authRoutes = [
          { link: "/logout", label: "Log Out", logout: true }
        ]
        break;
      case ('User'):
        routes = [
          { link: "/menu", label: "Menu" },
          { link: "/history", label: "Order history" },
          { link: "/cart", label: "Cart" },
        ]
        authRoutes = [
          { link: "logout", label: "Log Out", logout: true }
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
        <Grid container justify='space-between' alignItems="flex-start">
          <Grid item md="auto" sm={11} xs={11}>
            <ul className={menu}>
              {routes.map((links, index) => {
                return (
                  <NavItem key={index} link={links.link} active="active_link" click={this.openMenu}>
                    {links.label}
                  </NavItem>
                )
              })}
            </ul>
          </Grid>
          <Grid item className="icon" onClick={this.openMenu}>
          {this.state.isOpen ? <CloseIcon fontSize="large"/> : <MenuIcon fontSize="large"/>}
            
            
          </Grid> 
          <Grid item md="auto" sm={11} xs={11}>
            <ul className={menu}>
              {authRoutes.map((links, index) => {
                return (
                  <NavItem key={index} link={links.link} active="active_link" click={links.logout ? this.logOut : this.openMenu}>
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