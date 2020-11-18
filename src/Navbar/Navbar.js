//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

//styles
import './Navbar.scss';

//components
import NavItem from './NavItem/NavItem';

//actions
import * as actionTypes from '../store/actions/actionTypes';

class Navbar extends Component {

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
              Order history
            </NavItem>
            <NavItem
              link={`/add`}
              active="active_link">
              Add product
            </NavItem>
            <NavItem
              link={`/edit`}
              active="active_link">
              Edit products
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
              link={`/logout`}
              active="active_link"
              click={this.props.logOut}
            >
              Log Out
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
              link={`/login`}
              active="active_link"
              click={this.props.logIn}
            >
              Log In
    </NavItem>
            <NavItem
              link={`/register`}
              active="active_link"
            >
              Register
    </NavItem>
          </ul>
        </Grid>
      </Grid>
    )

    return (
      <nav className="navigation">
        {this.props.isLogin ? logIn : logOut}
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    isLogin: state.auth.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // logIn: () => dispatch({ type: actionTypes.AUTH_SUCCESS }),
    logOut: () => dispatch({ type: actionTypes.AUTH_LOGOUT })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);