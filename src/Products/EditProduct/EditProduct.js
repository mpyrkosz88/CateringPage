import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
// import "./AddProduct.scss"

import axios from '../../axios-path';

import img from '../../kanapka.jpg';

class EditProduct extends Component {


    state = {
        formIsValid: false,
        controls: {
            name: {
                elementType: 'input',
                label: 'Product name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product name',
                    name: 'pname',
                },
                value: '',
                errormsg: 'Please type product name',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                label: 'Price',
                elementConfig: {
                    type: 'number',
                    placeholder: '0',
                    name: 'price',
                    step: '0.01',
                },
                value: '',
                errormsg: 'Minimal price is 0.01',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            image: {
                elementType: 'input',
                label: 'Image',
                elementConfig: {
                    type: 'file',
                    name: 'image',
                },
                errormsg: 'Please add image',
                validation: {
                    required: true,
                },
                valid: false,
            },
        },
    }

    checkValiditiy(value, rules) {
        let isValid = true;
    
        if (!rules) {
          return true;
        }
    
        if (rules.required) {
          isValid = value.trim() !== '' && isValid;
        }
        
        if (rules.checkedNumber) {
          isValid = !isNaN(value) && value.length >= rules.minLength
        }
        return isValid;
      }
    
    
      inputChangedHandler = (event, controlName) => {
        const updatedControls = {
          ...this.state.controls,
          [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValiditiy(event.target.value, this.state.controls[controlName].validation),
            touched: true
          }
        }
    
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid })
      }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('axios w add dziala');
        axios.post('/add')
        .then(res => console.log(res))
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
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key]
          });
        }
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