// import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {Grid} from '@material-ui/core';

//components
import Layout from "./containers/Layout";
import Form from './Form/Form';
import Product from './Product/Product';
import AddProduct from './AddProduct/AddProduct';
import EditProduct from './EditProduct/EditProduct';
import Cart from './Cart/Cart';
import History from './History/History';

class App extends Component {
  render() {

    return (
      <div className="App">
      <Layout> 
      <Switch>
        <Route path={'/'} exact render={() => <Redirect to="/menu" />} />
        <Route path={'/menu'} component={Product} />
        <Route path={'/add'} component={AddProduct} />
        <Route path={'/edit'} component={EditProduct} />
        <Route path={'/signUp'} component={Form} />
        <Route path={'/cart'} component={Cart} />
        <Route path={'/history'} component={History} />
      </Switch>
      </Layout>
      </div>
      );
    }
  }

export default App;