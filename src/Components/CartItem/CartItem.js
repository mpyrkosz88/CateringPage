// libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//styles
import './CartItem.scss'

class CartItem extends Component {
    render() {
        return (
            <li className="cart_item">
                <Grid container alignItems="center">
                    <Grid sm={3} item container justify="center">
                        <h1>{this.props.name}</h1>
                    </Grid>
                    <Grid sm={3} item container justify="center">
                        <h2>Quantity: {this.props.quantity}</h2>
                    </Grid>
                    <Grid sm={3} item container justify="center">
                        <h2>Price: {parseInt(this.props.price) * parseInt(this.props.quantity)} zł</h2>
                    </Grid>
                    <Grid sm={3} item container justify="center">
                        <button onClick={this.props.clicked} className="cart_item_button">Delete</button>
                    </Grid>
                </Grid>
            </li>
        )
    }
}

export default CartItem