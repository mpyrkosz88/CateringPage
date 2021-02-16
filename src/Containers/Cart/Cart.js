//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import {connect} from 'react-redux';

//utils
import axios from '../../utils/axios-path';

//components
import CartItem from '../../Components/CartItem/CartItem';
import Confirmation from '../../Components/Confirmation/Confirmation';

//UI
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner'

//actions
import * as actions from '../../store/actions/cart';

class Cart extends Component {

    state = {
        cart: null,
        modalShow: false,
        orderConfirm: false,
    }

    componentDidMount() {
      axios.get('/cart', )
        .then(response => {
          if (response.data){
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
          .then((response) => {
            let quantity = this.state.cart.find(({_id}) => _id === id).quantity
              this.setState({
                cart: this.state.cart.filter(el => el._id !== id)
              })
              this.props.deleteFromCart(quantity)
          })
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
          axios.post('/post-order')
          .then(response => {
            console.log(response.data);
            })
          .then(() => {
            this.setState({ 
              cart: []
            })
            this.props.clearCart()
          })
          .catch((error) => {
            console.log(error);
          })
      }
          
          render() {
            let cartItems = <Spinner />;
            let totalPrice = 0;
            let orderButton = true;

            if (this.state.cart != null) {
              if (this.state.cart.length>0) {
                cartItems = this.state.cart.map(data => {        
                  return (
                    <CartItem 
                    key={data._id}
                    name={data.itemId.name}
                    price={data.itemId.price}
                    quantity={data.quantity}
                    clicked={()=>this.deleteProduct(data._id)}
                    />
                  )}
                  )
                  this.state.cart.map(data => {
                    let quantity = data.quantity
                    let price = data.itemId.price
                    return totalPrice += quantity * price
                }
                )
                orderButton = false;
              }
              else {
                cartItems = <h1>Cart is empty</h1>
              }
            }
            else {
              cartItems = <Spinner />
            }
              


        return (
                <Grid container justify="center">
                    <ul className="cart_list">
                        {cartItems}
                    </ul>
                    <Grid container className="order" direction="column" alignItems="center">
                        <div className="order_summarize">
                            <h2>Total price: {totalPrice} zł</h2>
                        </div>
                        
                        <button className="cart_item_button" 
                        onClick={this.openModal}
                        disabled={orderButton}
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


const mapStateToProps = state => {
  return {
    cart_quantity: state.cart.cart_quantity,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (quantity) => dispatch(actions.deleteFromCart(quantity)),
    clearCart: () => dispatch(actions.clearCart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);