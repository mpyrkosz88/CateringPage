import React, { Component } from 'react';
import "./AddProduct.scss"

import Input from '../../UI/Input/Input';

import axios from '../../axios-path';


class AddProduct extends Component {

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

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key]
          });
        }
        return (
            <div className="form_card">
                <form id="product_form" onSubmit={this.onSubmit}>
                    {formElementsArray.map(formElement => {
                        return (
                            <Input
                                key={formElement.id}
                                id={formElement.id}
                                elementType={formElement.config.elementType}
                                label={formElement.config.label}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                errormsg={formElement.config.errormsg}
                            />
                            )
                        })}
                </form>
                <button className="form_button" 
                type="submit" 
                form="product_form" 
                value="Add"
                disabled= {!this.state.formIsValid ? true : false}
                > Add </button>
            </div>

        )
    }
}

export default AddProduct


// <div className="form_card">
// <form onSubmit={this.onSubmit} id="form">
//     <div className="form_input">
//         <label htmlFor="fname">Name</label>
//         <input type="text" id="name" name="name" placeholder="Product Name"></input>
//     </div>
//     <div className="form_input">
//         <label htmlFor="Price">Price</label>
//         <input type="number" id="price" name="price" placeholder="0" step="0.01"></input>
//     </div>
//     <div className="form_input">
//         <label htmlFor="image">Image</label>
//         <input
//             type="file"
//             name="image"
//             id="image" />
//     </div>
// </form>
// <button className="form_button" type="submit" form="form" value="Add"> Add </button>
// </div>

// <div className="form_input">
// <label htmlFor="category">Choose a category</label>
// <select name="category" id="category">
//     <option value="kanapki">Kanapki</option>
//     <option value="Lunche">Lunche</option>
// </select>
// </div>