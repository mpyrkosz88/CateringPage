//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
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
        modalShow: false,
        orderConfirm: false,
    }

      componentDidMount() {
        console.log(this.props.cart);
        if (!this.props.cart) {
          this.props.loadCart();
        }
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
          })
          .catch((error) => {
            console.log(error);
          })
      }
          
          render() {
            let cartItems = <Spinner />
            let totalPrice = 0

            if (this.props.cart != null) {
              if (this.props.cart.length>0) {
                cartItems = this.props.cart.map(data => {        
                  return (
                    <CartItem 
                    key={data._id}
                    name={data.itemId.name}
                    price={data.itemId.price}
                    quantity={data.quantity}
                    clicked={()=>this.props.deleteProduct(data._id)}
                    />
                  )}
                  )
                  this.props.cart.map(data => {
                    let quantity = data.quantity
                    let price = data.itemId.price
                    return totalPrice += quantity * price
                }
                )
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
                        disabled={this.props.cart ? false : true }
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
      cart: state.cart.cartData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadCart: () => dispatch(actions.loadCart()),
      deleteProduct: (id) => dispatch(actions.deleteProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)