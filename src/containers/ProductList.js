//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//components
import Product from '../Products/Product/Product';

class ProductList extends Component {

    state = {

    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
          .then(response => {
            this.setState({ exercises: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    render() {
        return (
            <Grid container>
                <Grid item sm={4} container justify="center"><Product/></Grid>
                <Grid item sm={4} container justify="center"><Product/></Grid>
                <Grid item sm={4} container justify="center"><Product/></Grid>
                <Grid item sm={4} container justify="center"><Product/></Grid>
            </Grid>

        )
    }
}

export default ProductList
