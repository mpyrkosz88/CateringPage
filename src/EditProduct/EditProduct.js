import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
// import "./AddProduct.scss"

import img from '../kanapka.jpg';

class EditProduct extends Component {

    state = {
        edit: false,
    }

    editIsActive = () => {
        this.setState({
            edit: !this.state.edit
        })
        console.log(this.state);
    }

    deleteProduct = () => {
        console.log("usunieto");
        console.log("edit is false");
        this.setState({
            edit: false
        })
    }

    updateProduct = (e) => {
        e.preventDefault()
        console.log("update is ready");
        this.setState({
            edit: false
        })
    }

    render() {
        return (
            <div>

                <Grid container>
                    {this.state.edit ?
                        <div className="form_card">
                            <form method="post" id="form">
                                <div className="form_input">
                                    <label htmlFor="fname">Name</label>
                                    <input type="text" id="name" name="name" placeholder="Product Name"></input>
                                </div>
                                <div className="form_input">
                                    <label htmlFor="Price">Price</label>
                                    <input type="number" id="price" name="price" placeholder="0"></input>
                                </div>
                                <div className="form_input">
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image" />
                                </div>
                            </form>
                            <button className="form_button" type="submit" value="Cancel" onClick={this.editIsActive}> Cancel </button>
                            <button className="form_button" type="submit" form="form" value="Update" onClick={this.updateProduct}> Update </button>
                        </div>
                        :
                        <div className="card">
                            <h1> Kanapka</h1>
                            <figure><img src={img} /></figure>
                            <h2> 7 zł</h2>
                            <button className="card_button" onClick={this.editIsActive}> Edit</button>
                            <button className="card_button" onClick={this.deleteProduct}> Delete</button>
                        </div>
                    }

                </Grid>
            </div>
        )
    }
}

export default EditProduct


// <div className="form_input">
// <label htmlFor="category">Choose a category</label>
// <select name="category" id="category">
//     <option value="kanapki">Kanapki</option>
//     <option value="Lunche">Lunche</option>
// </select>
// </div>