import React from 'react';
import { Grid } from '@material-ui/core';

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
                <Grid xs={3} item container justify="center" alignItems="center">
                    <p>{props.lname} {props.fname}</p>
                    <p>{props.street},</p> 
                    <p>{props.city}</p> 
                    <p>tel:{props.phone} </p>
                </Grid>
                <Grid xs={5} item container justify="center" alignItems="center">
                    <Grid xs={7} item container justify="center">
                        {props.orderData.map((data, index) => {
                            return <p key={index} className="history_cart_border">{data.name}</p>
                        })}
                    </Grid>
                    <Grid xs={2} item container justify="center">
                        {props.orderData.map((data, index) => {
                            return <p key={index} className="history_cart_border">{data.quantity}</p>
                        })}
                    </Grid>
                    <Grid xs={2} item container justify="center">
                        {props.orderData.map((data, index) => {
                            return <p key={index} className="history_cart_border">{data.price}</p>
                        })}
                    </Grid>
                    </Grid>
                    <Grid xs={1} item container justify="center" alignItems="center" className="border_right">
                        <p>{totalPrice}</p>
                    </Grid>
                <Grid xs={2} item container justify="center" alignItems="center">
                    <p>{props.comments}</p>
                </Grid>
            </Grid>
        </li>
    )
}

export default orderItem
