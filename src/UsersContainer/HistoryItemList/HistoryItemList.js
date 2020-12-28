//libraries
import React, {Component} from 'react';
import { Grid } from '@material-ui/core';

//utils
import axios from '../../utils/axios-path';

import HistoryItem from '../../Components/HistoryItem/HistoryItem';
//components

class HistoryItemList extends Component {

    state = {
        history: []
    }

    componentDidMount() {
        axios
            .get('/get-users/' + this.props.id)
            .then(response => {
                const history = response.data
                this.setState({history: history})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        let history
        if (this.state.history.length > 0) {
            history = this.state.history.map((data, index) => {
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
                history = <h1>History is empty</h1>
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
                {history}
            </ul>
        </Grid>
        )
    }
}

export default HistoryItemList