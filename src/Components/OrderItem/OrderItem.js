import React from 'react';
import { Grid } from '@material-ui/core';

import './OrderItem.scss'

const orderItem = (props) => {

    let totalPrice = 0
    props.orderData.map(data => {
            let quantity = data.quantity
            let price = data.price
            return totalPrice += quantity * price
        })

    return (
        <li className="history_cart_item">
            <Grid container>
                <Grid xs={1} item container justify="center" alignItems="center">
                    <p> {props.timeDate}</p>
                </Grid>
                <Grid xs={2} item container justify="center" alignItems="center">
                    <p>{props.lname} {props.fname}</p>
                </Grid>
                <Grid xs={2} item container justify="center" alignItems="center">
                    <p>{props.street},</p> 
                    <p>{props.city}</p> 
                </Grid>
                <Grid xs={1} item container justify="center" alignItems="center" className="border_right ">
                    {props.phone}
                </Grid>
                <Grid xs={6} item container justify="center" alignItems="center">
                    <Grid xs={7} item container justify="center">
                        {props.orderData.map((data, index) => {
                            return <p key={index}>{data.name}</p>
                        })}
                    </Grid>
                    <Grid xs={2} item container justify="center">
                        {props.orderData.map((data, index) => {
                            return <p key={index}>{data.quantity}</p>
                        })}
                    </Grid>
                    <Grid xs={2} item container justify="center">
                        {props.orderData.map((data, index) => {
                            return <p key={index}>{data.price}</p>
                        })}
                    </Grid>
                    <Grid xs={1} item container justify="center">
                        <p>{totalPrice}</p>
                    </Grid>
                </Grid>
            </Grid>
        </li>
    )
}

export default orderItem
