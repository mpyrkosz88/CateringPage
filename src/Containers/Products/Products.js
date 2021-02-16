//libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

//utils
import axios from '../../utils/axios-path';

//components
import Product from '../../Components/Product/Product';
import Spinner from '../../UI/Spinner/Spinner'

//actions

import * as actions from '../../store/actions/cart';

class Products extends Component {

    state = {
      products: null,
    }

    componentDidMount() {
        axios.get('/menu')
          .then(response => {
            if (response.data){
              this.setState({ 
                products: response.data 
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }

// CART

    //   addToCart(id) {
    //     axios.post('/addToCart/' + id)
    //     .then(res => console.log(res.data))
    //     .catch((err) => console.log(err))
    // }


// EDIT

      onSubmit = (e) => {
        e.preventDefault();
        axios.post('/add')
        .then(res => console.log(res))
      }

      deleteProduct(id) {
      axios.delete('/delete/'+ id)
        .then(response => {
          console.log(response.data)
          this.setState({
            products: this.state.products.filter(el => el._id !== id)
          })
        })
      .catch((error) => {
        console.log(error);
      })
      }



    render() {

      let listConfig = null

      switch(this.props.authRole) {
        case('Admin'):
        listConfig = {
          clicked: this.deleteProduct.bind(this),
          btnValue: "Delete",
          editBtnValue: "Edit"
        }
        break;
        case('User'):
        listConfig = {
          clicked: this.props.addToCart.bind(this),
          btnValue: "Add to cart"
        }
        break;
        default:
          listConfig = {
            clicked: null,
            btnValue: null
          }
      }

      let productsList = <Spinner />
      
      if (this.state.products != null) {
        if (this.state.products.length>0) {
          productsList = this.state.products.map(data => {        
            return (
            <Product 
            key={data._id}
            id={data._id}
            name={data.name}
            price={data.price}
            image={data.image}
            clicked={() => listConfig.clicked(data._id)}
            btnValue={listConfig.btnValue}
            editBtnValue={listConfig.editBtnValue}
            />
            )}
            )
        }
        else {
          productsList = <h1>Product list is empty</h1>
        }
      }
      else {
        productsList = <Spinner />
      }


        return (
            <Grid container>
              {productsList}
            </Grid>
        )
    }
}

const mapStateToProps = state => {
  return {
    authRole: state.auth.authRole,
    }
}

const mapDispatchToProps = dispatch => {
  return {
      addToCart: (id) => dispatch(actions.addToCart(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);