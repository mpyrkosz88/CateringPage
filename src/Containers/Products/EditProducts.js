//libraries
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from '../../utils/axios-path';

//components
import Product from '../../Components/Products/Product/Product';

class EditProducts extends Component {

    state = {
        products: []
    }

      componentDidMount() {
          axios.get('/edit')
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
        return (
                <Grid container>
                {this.state.products.length>0 ? 
                  this.state.products.map(data => (
                    <Product 
                    key={data._id}
                    id={data._id}
                    name={data.name}
                    price={data.price}
                    image={data.image}
                    btnValue="Delete"
                    editBtnValue="Edit"
                    clicked={() => this.deleteProduct(data._id)}
                    />
                    )
                    )
                    :
                    <h1>Products is empty</h1> }
                </Grid>
        )
    }
}

export default EditProducts