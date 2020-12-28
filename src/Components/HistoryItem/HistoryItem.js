import React from 'react';
import { Grid } from '@material-ui/core';

import './HistoryItem.scss'

const historyItem = (props) => {
    return (
        <li className="history_cart_item">
            <Grid container>
                <Grid xs={2} item container justify="center" alignItems="center">
                    <p> {props.timeDate}</p>
                </Grid>
                <Grid xs={4} item container justify="center" alignItems="center">
                    {props.orderData.map((data, index) => <p key={index}> {data.name}</p>)}
                </Grid>
                <Grid xs={2} item container justify="center" alignItems="center">
                    {props.orderData.map((data, index) => <p key={index}> {data.quantity}</p>)}
                </Grid>
                <Grid xs={2} item container justify="center" alignItems="center" className="border_right ">
                    {props.orderData.map((data, index) => <p key={index}> {data.price}</p>)}
                </Grid>
                <Grid xs={2} item container justify="center" alignItems="center">
                    <p>
                        {props.totalPrice}
                    </p>
                </Grid>
            </Grid>
        </li>
    )
}

export default historyItem
