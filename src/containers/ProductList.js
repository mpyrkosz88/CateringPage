//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//components
import Product from '../Products/Product/Product';

// rendering list of products after load data from database
class ProductList extends Component {

    state = {

    }

    componentDidMount() {
        axios.get('')
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
