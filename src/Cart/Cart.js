import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import './Cart.scss'
class Cart extends Component {
    render() {
        return (
                <Grid container justify="center">
                    <ul className="cart_list">
                        <li className="cart_item">
                            <Grid container alignItems="center">
                                <Grid sm={3} item container justify="center">
                                    <h1>Kanapka</h1>
                                </Grid>
                                <Grid sm={3} item container justify="center">
                                    <h2>Quantity: 3</h2>
                                </Grid>
                                <Grid sm={3} item container justify="center">
                                    <h2>Price: 7 zł</h2>
                                </Grid>
                                <Grid sm={3} item container justify="center">
                                    <button className="cart_item_button">Delete</button>
                                </Grid>
                            </Grid>
                        </li>
                        <li className="cart_item">
                        <Grid container alignItems="center">
                                <Grid sm={3} item container justify="center">
                                    <h1>Lunch</h1>
                                </Grid>
                                <Grid sm={3} item container justify="center">
                                    <h2>Quantity: 1</h2>
                                </Grid>
                                <Grid sm={3} item container justify="center">
                                    <h2>Price: 22 zł</h2>
                                </Grid>
                                <Grid sm={3} item container justify="center">
                                    <button className="cart_item_button">Delete</button>
                                </Grid>
                            </Grid>
                        </li>
                    </ul>
                    <Grid container className="order" direction="column" alignItems="center">
                        <div className="order_summarize">
                            <h2>
                            Total price: 55 zł
                            </h2>
                        </div>
                        <button className="cart_item_button">Order</button>
                    </Grid>
                </Grid>
        )
    }
}

export default Cart 