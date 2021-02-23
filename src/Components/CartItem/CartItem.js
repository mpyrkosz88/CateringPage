// libraries
import React from 'react';
import { Grid } from '@material-ui/core';

const cartItem = (props) => (
            <li className="cart_item">
                <Grid container alignItems="center">
                    <Grid sm={3} item container justify="center">
                        <h1>{props.name}</h1>
                    </Grid>
                    <Grid sm={3} item container justify="center">
                        <h2>Quantity: {props.quantity}</h2>
                    </Grid>
                    <Grid sm={3} item container justify="center">
                        <h2>Price: {parseInt(props.price) * parseInt(props.quantity)} zł</h2>
                    </Grid>
                    <Grid sm={3} item container justify="center">
                        <button onClick={props.clicked} className="cart_item_button">Delete</button>
                    </Grid>
                </Grid>
            </li>
        );

export default cartItem