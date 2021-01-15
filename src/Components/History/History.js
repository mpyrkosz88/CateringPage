import React from 'react';
import { Grid } from '@material-ui/core';

//components
import HistoryItem from '../HistoryItem/HistoryItem'

const history = (props) => {

        let historyData
        if (props.data.length > 0) {
            historyData = props.data.map((data, index) => {
                let totalPrice = 0
                data.products.map(data => {
                        let quantity = data.quantity
                        let price = data.price
                        return totalPrice += quantity * price
                    })
                    return <HistoryItem 
                    key={index}
                    timeDate={data.timeDate.slice(0,10)}
                    orderData={data.products}
                    totalPrice={totalPrice}
                    />         
                })
            }
            else {
                historyData = <h1>History is empty</h1>
            }  
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
                        {historyData}
                    </ul>
                </Grid>
        )
}

export default history 