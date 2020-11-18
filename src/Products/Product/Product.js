import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import "./Product.scss"
import img from '../../kanapka.jpg';

//need to change data
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
