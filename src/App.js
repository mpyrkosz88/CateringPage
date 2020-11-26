// import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';

//components
import Layout from "./containers/Layout";
import Login from './Auth/Login/Login';
import ProductList from './containers/ProductList'
import AddProducts from './containers/AddProducts';
import EditProducts from './containers/EditProducts';
import Edit from './Products/Edit/Edit';
import Cart from './Cart/Cart';
import History from './History/History';
import Register from './Auth/Register/Register';

class App extends Component {
  render() {
    const routes = (this.props.isLogin ?   

      <Switch>
        <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
        <Route path={'/menu'} component={ProductList} />
        <Route path={'/add'} component={AddProducts} />
        <Route path={'/edit'} exact component={EditProducts} />
        <Route path={'/edit/:id'} component={Edit} />
        <Route path={'/cart'} component={Cart} />
        <Route path={'/history'} component={History} />
      </Switch> :
      
      <Switch>
        <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
        <Route path={'/logout'} render={() => <Redirect to="/menu" />} />
        <Route path={'/menu'} component={ProductList} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
      </Switch>
    ) 
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
      isLogin: state.auth.isLogin
      }
  }
  
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     onTryAutoSignup: () => dispatch(actions.authCheckState())
  //   }
  // }
  
  export default withRouter(connect(mapStateToProps)(App));
  