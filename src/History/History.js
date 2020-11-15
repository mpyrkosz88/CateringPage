import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import './History.scss'
class History extends Component {
    render() {
        return (
                <Grid container justify="center">
                    <Grid container alignItems="center" className="history_table">
                        <Grid xs={2} item container justify="center">
                            <p className="table_title">Data</p>
                        </Grid>
                        <Grid xs={4} item container justify="center">
                            <p className="table_title">Products</p>
                        </Grid>
                        <Grid xs={2} item container justify="center">
                            <p className="table_title">Quantity</p>
                        </Grid>
                        <Grid xs={2} item container justify="center">
                            <p className="table_title">Price</p>
                        </Grid>
                        <Grid xs={2} item container justify="center">
                            <p className="table_title">Total</p>
                        </Grid>
                    </Grid>
                    <ul className="history_cart_list">
                        <li className="history_cart_item">
                            <Grid container alignItems="center">
                                <Grid xs={2} item item container justify="center">
                                    <p> 10-10-2010</p>
                                </Grid>
                                <Grid xs={4} item container justify="center">
                                    <p>Kanapka</p>
                                    <p>Lunch</p>
                                </Grid>
                                <Grid xs={2} item container justify="center">
                                    <p>2</p>
                                    <p>1</p>
                                </Grid>
                                <Grid xs={2} item container justify="center" className="border_right ">
                                    <p>7 zł</p>
                                    <p>12 zł</p>    
                                </Grid>
                                <Grid xs={2} item container justify="center">
                                    <p>19 zł</p>
                                </Grid>
                            </Grid>
                        </li>
                        <li className="history_cart_item">
                        <Grid container alignItems="center">
                            <Grid xs={2} item container justify="center">
                                <p> 11-10-2010</p>
                            </Grid>
                            <Grid xs={4} item container justify="center">
                                <p>Kanapka</p>
                                <p>Lunch</p>
                            </Grid>
                            <Grid xs={2} item container justify="center">
                                <p>2</p>
                                <p>2</p>
                            </Grid>
                            <Grid xs={2} item container justify="center" className="border_right ">
                                <p>7 zł</p>
                                <p>15 zł</p>    
                            </Grid>
                            <Grid xs={2} item container justify="center">
                                <p>25 zł</p>
                            </Grid>
                        </Grid>
                    </li>
                    </ul>
                </Grid>
        )
    }
}

export default History 