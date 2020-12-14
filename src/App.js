// import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
// import {Grid} from '@material-ui/core';

//containers
import AddProducts from './Containers/Products/AddProducts';
import Cart from './Containers/Cart/Cart';
import EditProducts from './Containers/Products/EditProducts';
import History from './Containers/History/History';
import Layout from "./Containers/Layout/Layout";
import ProductList from './Containers/Products/ProductList'

//components
import Login from './Auth/Login/Login';
import Edit from './Components/Products/Edit/Edit';
import Register from './Auth/Register/Register';

//actions
import * as actions from './store/actions/auth';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

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
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
  