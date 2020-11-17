// import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';

//components
import Layout from "./containers/Layout";
import Login from './Auth/Login/Login';
import Product from './Products/Product/Product';
import AddProduct from './Products/AddProduct/AddProduct';
import EditProduct from './Products/EditProduct/EditProduct';
import Cart from './Cart/Cart';
import History from './History/History';
import Register from './Auth/Register/Register';

class App extends Component {
  render() {
    const routes = (this.props.isLogin ?   

      <Switch>
        <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
        <Route path={'/menu'} component={Product} />
        <Route path={'/add'} component={AddProduct} />
        <Route path={'/edit'} component={EditProduct} />
        <Route path={'/cart'} component={Cart} />
        <Route path={'/history'} component={History} />
      </Switch> :
      
      <Switch>
        <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
        <Route path={'/menu'} component={Product} />
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
  