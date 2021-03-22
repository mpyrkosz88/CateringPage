//libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

//utils
import axios from '../../utils/axios-path';

//components
import Product from '../../Components/Product/Product';
import Spinner from '../../UI/Spinner/Spinner'
import Sidebar from '../../Navigation/Sidebar/Sidebar';

//actions
import * as actions from '../../store/actions/index';

class Products extends Component {

    componentDidMount() {
        if(!this.props.products) {
          this.props.loadProducts()
        }
      }

// EDIT

      onSubmit = (e) => {
        e.preventDefault();
        axios.post('/add')
        .then(res => console.log(res))
      }
// DELETE

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

      let location = this.props.location.pathname.split('/menu')[1];
      let categoryName = null;

      switch(location) {
        case('/sandwiches'):
        categoryName = 'Sandwiches'
        break;
        case('/tortillas'):
        categoryName = 'Tortillas'
        break;
        case('/yoghurts'):
        categoryName = 'Yogurths'
        break;
        case('/desserts'):
        categoryName = 'Desserts'
        break;
        case('/breakfasts'):
        categoryName = 'Breakfasts'
        break;
        case('/salads'):
        categoryName = 'Salads'
        break;
        case('/lunches'):
        categoryName = 'Lunches'
        break;
        case('/pastas'):
        categoryName = 'Pastas'
        break;
        case('/sushi'):
        categoryName = 'Sushi'
        break;
        case('/drinks'):
        categoryName = 'Drinks'
        break;
        case(''):
        categoryName = 'All'
        break;
        default:
          categoryName = null
      }

      let productsList = <Spinner />
      
      if (this.props.products !== null) {
        let filteredProducts = this.props.products;
        if (categoryName === 'All') {
          filteredProducts = this.props.products
        }
        else {
          filteredProducts = this.props.products.filter(el => el.category === categoryName)

        }
        if (categoryName === null) {
          productsList = <h1>There is no such category</h1>
        }
        else {
          if (filteredProducts.length>0) {
            productsList = filteredProducts
            .map(data => {        
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
      }
      else {
        productsList = <Spinner />
      }
        return (
            <Grid container>
              <Grid item xs={4} sm={3} md={2} lg={2} xl={1}>
                <Sidebar />
              </Grid>
              <Grid item xs={8} sm={9} md={10} lg={10} xl={11} container>
                {productsList}
              </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
  return {
    authRole: state.auth.authRole,
    products: state.cart.products,
    }
}

const mapDispatchToProps = dispatch => {
  return {
      loadProducts: () => dispatch(actions.loadProducts()),
      addToCart: (id) => dispatch(actions.addToCart(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);