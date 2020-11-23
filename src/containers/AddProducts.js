//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

//components
import ProductForm from '../Products/ProductForm/ProductForm';

class AddProducts extends Component {

    render() {
        return (
            <Grid container justify="center">
                <ProductForm btnValue="Add">Add</ProductForm>
            </Grid>
        )
    }
}

export default AddProducts
