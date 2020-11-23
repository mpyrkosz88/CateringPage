import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from '../../axios-path';

//components
import Product from '../Product/Product';


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
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            })
        }
    onSubmit = (e) => {
        e.preventDefault();
        console.log('axios w add dziala');
        axios.post('/add')
        .then(res => console.log(res))
    }

    deleteProduct(id) {
      axios.delete('http://localhost:5000/delete/'+ id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        products: this.state.products.filter(el => el._id !== id)
      })
    }

    render() {
        return (
            <div>
                <Grid container>
                        {(this.state.products.map(data => (
                            <Product 
                            key={data._id}
                            id={data._id}
                            name={data.name}
                            price={data.price}
                            image={data.image}
                            btnValue="Delete"
                            editBtnValue="Edit"
                            clicked={() => this.deleteProduct(data._id)}
                            >
                            </Product>))
                          )}
                </Grid>
            </div>
        )
    }
}

export default EditProducts