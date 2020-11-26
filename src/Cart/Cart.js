import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import axios from '../utils/axios-path';
import './Cart.scss'

import CartItem from './CartItem';

class Cart extends Component {

    state = {
        cart: [],
        totalPrice: 0
    }

      componentDidMount() {
          axios.get('/cart')
            .then(response => {
              if (response.data.length > 0 ){
                this.setState({ 
                  cart: response.data 
                })
              }
            })
            .then(()=> this.calculatePrice())
            .catch((error) => {
              console.log(error);
            })
        }

        calculatePrice() {
            let totalPrice = 0
            this.state.cart.map(data => {
                let quantity = data.quantity
                let price = data.itemId.price
                return totalPrice += quantity * price
            }
            )
            this.setState({
                totalPrice: totalPrice
            })
        }

        deleteProduct(id) {
            axios.delete('/cart-delete/'+ id)
              .then(response => { console.log(response.data)})
              .then(() => {
                  this.setState({
                    cart: this.state.cart.filter(el => el._id !== id)
                  })
              })
              .then(()=> this.calculatePrice())
              .catch(err => {console.log(err)});
          }

        render() {
        return (
                <Grid container justify="center">
                    <ul className="cart_list">
                    {this.state.cart.length> 0 ? 
                        this.state.cart.map(data => {
                            return (
                                <CartItem 
                                key={data._id}
                                name={data.itemId.name}
                                price={data.itemId.price}
                                quantity={data.quantity}
                                clicked={()=>this.deleteProduct(data._id)}
                                />
                                )
                            })
                          :
                          <h1>Cart is empty</h1> }
                    </ul>
                    <Grid container className="order" direction="column" alignItems="center">
                        <div className="order_summarize">
                            <h2>
                            Total price: {this.state.totalPrice} zł
                            </h2>
                        </div>
                        <button className="cart_item_button" onClick={null}>Order</button>
                    </Grid>
                </Grid>
        )
    }
}

export default Cart 