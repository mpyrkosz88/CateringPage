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

class Sidebar extends Component {

    state = {
      isOpen: false,
    }

    openMenu = () => {
      this.setState({
        isOpen: true,
      })
    }
    closeMenu = () => {
      this.setState({
        isOpen: false,
      })
    }

    logOut = () => {
      this.closeMenu();
      this.props.logOut()
    }

  render() {

    let routes = [
      { link: "/menu/kanapki", label: "Kanapki" },
      { link: "/menu/makarony", label: "Makarony" },
      { link: "/menu/tortille", label: "Tortille" },
    ]

    const menu = this.state.isOpen ? null : "hideMenu"

    return (
      <nav className="sidebar">
        <Grid container justify='space-between' alignItems="flex-start">
          <Grid item md="auto" sm={11} xs={11}>
            <ul className={menu}>
              {routes.map((links, index) => {
                return (
                  <NavItem key={index} link={links.link} active="active_link" click={this.closeMenu} className={links.className}>
                  </NavItem>
                )
              })}
            </ul>
          </Grid>
          <Grid item sm={1} xs={1} className="icon" onClick={this.state.isOpen ? this.closeMenu : this.openMenu}>
          {this.state.isOpen ? <CloseIcon fontSize="large"/> : <MenuIcon fontSize="large"/>}
            
            
          </Grid> 

        </Grid>
      </nav>
    )
  }
}

// const mapStateToProps = (state, props) => {
//   return {
//     authRole: state.auth.authRole,
//     cart_quantity: state.cart.cart_quantity,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     logOut: () => dispatch(actions.logout())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
export default (Sidebar);