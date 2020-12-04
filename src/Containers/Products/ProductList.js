//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//utils
import axios from '../../utils/axios-path';

//components
import Product from '../../Components/Products/Product/Product';

// rendering list of products after load data from database
class ProductList extends Component {

    state = {
      products: []
    }

    componentDidMount() {
        axios.get('/menu')
          .then(response => {
            if (response.data.length > 0 ){
              this.setState({ 
                products: response.data 
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }

      addToCart = (id) => {
        axios.post('/addToCart/' + id)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <Grid container>
            {this.state.products.length>0 ? 
                this.state.products.map(data => {               
                  return (
                  <Product 
                  key={data._id}
                  name={data.name}
                  price={data.price}
                  image={data.image}
                  btnValue="Add to cart"
                  clicked={() => this.addToCart(data._id)}
                  />
                  )}
                  )
                  :
                  <h1>Menu is empty</h1> }
                
            </Grid>
        )
    }
}

export default ProductList
