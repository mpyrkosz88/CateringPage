import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import "./Product.scss"
import img from '../kanapka.jpg';

class Product extends Component {

    render() {
        return (

            <div className="card">
                <h1> Kanapka</h1>
                <figure><img src={img} /></figure>
                <h2> 7 zł</h2>
                <button className="card_button"> Add to cart</button>
            </div>

        )
    }
}

export default Product

// <Grid container alignItems="center" justify="space-around">
// <Grid>
//     <button>Edit</button>
// </Grid>
// <Grid>
//     <button> Delete (Admin)</button>
// </Grid>
// </Grid>