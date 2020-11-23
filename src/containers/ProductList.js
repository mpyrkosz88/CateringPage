//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import axios from '../axios-path';

//components
import Product from '../Products/Product/Product';

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
    render() {
        return (
            <Grid container>
                {this.state.products.map(data => (
                  <Product 
                  key={data._id}
                  name={data.name}
                  price={data.price}
                  image={data.image}
                  btnValue="Add to cart"
                  clicked={() => console.log(`Produkt ${data.name} dodano do koszyka`)}
                  >
                  
                  </Product>))
                }
            </Grid>

        )
    }
}

export default ProductList
