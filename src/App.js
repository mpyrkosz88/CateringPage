// import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
// import {Grid} from '@material-ui/core';

//containers
import Cart from './Containers/Cart/Cart';
import History from './Containers/History/History';
import Layout from "./Containers/Layout/Layout";
import Products from './Containers/Products/Products'

//components
import AddProduct from './Forms/AddProduct/AddProduct'
import Login from './Forms/Login/Login';
import Edit from './Forms/Edit/Edit';
import Register from './Forms/Register/Register';

import Page404 from './Components/404/404';

//actions
import * as actions from './store/actions/auth';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
        <Route path={'/menu'} component={Products} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/logout'} render={() => <Redirect to="/menu" />} />
        <Route component={Page404} />
      </Switch>
    )

    switch(this.props.authRole) {
      case('Admin'):
          routes = (
          <Switch>
              <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
              <Route path={'/menu'} component={Products} />
              <Route path={'/add'} component={AddProduct} />
              <Route path={'/edit/:id'} component={Edit} />
              <Route path={'/logout'} render={() => <Redirect to="/menu" />} />
              <Route component={Page404} />
          </Switch>
        )
        break;
        case('User'):
          routes = (
            <Switch>
              <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
              <Route path={'/menu'} component={Products} />
              <Route path={'/history'} component={History} />
              <Route path={'/cart'} component={Cart} />
              <Route path={'/logout'} render={() => <Redirect to="/menu" />} />
              <Route component={Page404} />
            </Switch>
          )
         break;
      default:
        routes = (
          <Switch>
            <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
            <Route path={'/menu'} component={Products} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
            <Route path={'/logout'} render={() => <Redirect to="/menu" />} />
            <Route component={Page404} />
          </Switch>
        )
    }

    return (
      <div className="App">
        <Layout> 
          {routes}
        </Layout>
      </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authRole: state.auth.authRole,
      }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
  

  