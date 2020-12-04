import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import './HistoryItem.scss'

const historyItem = (props) => {
    return (
        <li className="history_cart_item">
            <Grid container alignItems="center">
                <Grid xs={2} item item container justify="center">
                    <p> {props.timeDate}</p>
                </Grid>
                <Grid xs={4} item container justify="center">
                    {props.orderData.map(data => <p> {data.name}</p>)}
                </Grid>
                <Grid xs={2} item container justify="center">
                    {props.orderData.map(data => <p> {data.quantity}</p>)}
                </Grid>
                <Grid xs={2} item container justify="center" className="border_right ">
                    {props.orderData.map(data => <p> {data.price}</p>)}
                </Grid>
                <Grid xs={2} item container justify="center">
                    <p>
                        {props.totalPrice}
                    </p>
                </Grid>
            </Grid>
        </li>
    )
}

export default historyItem
