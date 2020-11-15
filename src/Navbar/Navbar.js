//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//styles
import './Navbar.scss';

//components
import NavItem from './NavItem/NavItem';

class Navbar extends Component {
  
  state = {
    isLogin: true,
  }

  logOutUser = () => {
    this.setState({
      isLogin:false,
    })
  }

  logInUser = () => {
    this.setState({
      isLogin:true,
    })
  }

  render() {
let logIn = (
  <Grid container justify="space-between" >
  <Grid>
    <ul>
      <NavItem
        link={`/menu`}
        active="active_link"
      >
        Menu
      </NavItem>
      <NavItem
      link={`/history`}
      active="active_link"
    >
      Historia zamówień
    </NavItem>
      <NavItem
        link={`/add`}
        active="active_link">
        Dodaj produkt
      </NavItem>
      <NavItem
        link={`/edit`}
        active="active_link">
        Edytuj produkt
      </NavItem>
    </ul>
  </Grid>
  <Grid >
    <ul>
      <NavItem
        link={`/menu`}
        active="active_link"
        click={this.logOutUser}
      >
        Wyloguj
    </NavItem>
    </ul>
  </Grid>
</Grid>
)

let logOut = (
  <Grid container justify="space-between" >
  <Grid>
    <ul>
      <NavItem
        link={`/menu`}
        active="active_link"
      >
        Menu
      </NavItem>
    </ul>
  </Grid>
  <Grid >
    <ul>
      <NavItem
        link={`/cart`}
        active="active_link"
      >
        Cart
    </NavItem>
      <NavItem
        link={`/signIn`}
        active="active_link"
        click={this.logInUser}
      >
        SignIn
    </NavItem>
      <NavItem
        link={`/signUp`}
        active="active_link"
      >
        SignUp
    </NavItem>
    </ul>
  </Grid>
</Grid>
)

    return (
      <nav className="navigation">
      {this.state.isLogin ? logIn : logOut}
    </nav>
    )
  }
}

export default Navbar;