//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//utils
import axios from '../utils/axios-path';

//components
import CartItem from './CartItem';
import Confirmation from '../Confirmation/Confirmation';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

//styles
import './Cart.scss'

class Cart extends Component {

    state = {
        cart: [],
        modalShow: false,
        orderConfirm: false,
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
            .catch((error) => {
              console.log(error);
            })
        }

        deleteProduct(id) {
            axios.delete('/cart-delete/'+ id)
              .then(() => {
                  this.setState({
                    cart: this.state.cart.filter(el => el._id !== id)
                  })
              })
              .then(()=> this.calculatePrice())
              .catch(err => {console.log(err)});
          }

        openModal = () => {
          this.setState({
            modalShow: true,
          })
        }

        closeModal =() => {
          this.setState({
            modalShow: false,
          },() => {
            setTimeout(() => {
              this.setState({
                orderConfirm: false,
              })
            },500)
          })
        }

        order = () => {
          this.setState({
            orderConfirm: true,
          })
          axios.get('/get-order')
          .then(response => {
            console.log(response);
            })
          .then(() => {
            this.setState({ 
              cart: []
            })
          })
          .catch((error) => {
            console.log(error);
          })
      }
          
          render() {
            const CartItems = (this.state.cart.map(data => {
              return (
                  <CartItem 
                  key={data._id}
                  name={data.itemId.name}
                  price={data.itemId.price}
                  quantity={data.quantity}
                  clicked={()=>this.deleteProduct(data._id)}
                  />
                  )
              }))
              let totalPrice = 0
              this.state.cart.map(data => {
                  let quantity = data.quantity
                  let price = data.itemId.price
                  return totalPrice += quantity * price
              }
              )

        return (
                <Grid container justify="center">
                    <ul className="cart_list">
                        {this.state.cart.length> 0 ? CartItems : <h1>Cart is empty</h1> }
                    </ul>
                    <Grid container className="order" direction="column" alignItems="center">
                        <div className="order_summarize">
                            <h2>Total price: {totalPrice} zł</h2>
                        </div>
                        
                        <button className="cart_item_button" 
                        onClick={this.openModal}
                        disabled={this.state.cart.length> 0 ? false : true }
                        >Order</button>
                    </Grid>
                    <Modal show={this.state.modalShow}> 
                      <Confirmation clickedClosed={this.closeModal} orderConfirm={this.state.orderConfirm} clickedOrder={this.order}/> 
                    </Modal>
                    <Backdrop show={this.state.modalShow} clicked={this.closeModal}/>
                </Grid>
        )
    }
}

export default Cart 