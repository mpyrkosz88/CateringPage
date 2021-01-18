// import './App.css';
import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

//containers
import Cart from './Containers/Cart/Cart';
import Layout from "./Containers/Layout/Layout";
import Products from './Containers/Products/Products'
import UserOrderHistory from './Containers/UserOrderHistory/UserOrderHistory';
import AdminUsersHistory from './Containers/AdminUsersHistory/AdminUsersHistory';
import AdminOrdersContainer from './Containers/AdminOrdersContainer/AdminOrdersContainer';

//components
import AddProduct from './Forms/AddProduct/AddProduct'
import Login from './Forms/Login/Login';
import EditProduct from './Forms/EditProduct/EditProduct';
import Register from './Forms/Register/Register';
import Reset from './Forms/Reset/Reset';
import NewPass from './Forms/NewPass/NewPass';

import Page404 from './Components/404/404';

//actions
import * as actions from './store/actions/auth';


class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to="/menu"/>}/>
                <Route path={'/menu'} component={Products}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/reset'} exact component={Reset}/>
                <Route path={'/reset/:resetToken'} component={NewPass}/>
                <Route path={'/logout'} render={() => <Redirect to="/menu"/>}/>
                <Route component={Page404}/>
            </Switch>
        )

        switch (this.props.authRole) {
            case('Admin'):
                routes = (
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to="/menu"/>}/>
                        <Route path={'/menu'} component={Products}/>
                        <Route path={'/add'} component={AddProduct}/>
                        <Route path={'/edit/:id'} component={EditProduct}/>
                        <Route path={'/users_history'} component={AdminUsersHistory}/>
                        <Route path={'/orders_history'} component={AdminOrdersContainer}/>
                        <Route path={'/logout'} render={() => <Redirect to="/menu"/>}/>
                        <Route component={Page404}/>
                    </Switch>
                )
                break;
            case('User'):
                routes = (
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to="/menu"/>}/>
                        <Route path={'/menu'} component={Products}/>
                        <Route path={'/history'} component={UserOrderHistory}/>
                        <Route path={'/cart'} component={Cart}/>
                        <Route path={'/logout'} render={() => <Redirect to="/menu"/>}/>
                        <Route component={Page404}/>
                    </Switch>
                )
                break;
            default:
                routes = (
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to="/menu"/>}/>
                        <Route path={'/menu'} component={Products}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/register'} component={Register}/>
                        <Route path={'/reset'} exact component={Reset}/>
                        <Route path={'/reset/:resetToken'} component={NewPass}/>
                        <Route path={'/logout'} render={() => <Redirect to="/menu"/>}/>
                        <Route component={Page404}/>
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
    return {authRole: state.auth.authRole}
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
