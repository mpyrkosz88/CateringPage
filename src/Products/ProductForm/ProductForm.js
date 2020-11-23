import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import "./ProductForm.scss"

import Input from '../../UI/Input/Input';

// import axios from '../../axios-path';
import axios from 'axios';

class ProductForm extends Component {

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
                elementType: 'image',
                label: 'Image',
                elementConfig: {
                    type: 'file',
                    name: 'image',
                },
                file: null,
                errormsg: 'Please add image',
                validation: {
                    required: true,
                },
                valid: false,
            },
        },
        redirect: false,
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
            file: event.target.files,
            touched: true,
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
      let formData = new FormData();
      formData.append('image', this.state.controls.image.file[0]);
      formData.append('name', this.state.controls.name.value);
      formData.append('price', this.state.controls.price.value);

        axios.post('http://localhost:5000/add', formData)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect:true }))
        .catch((err) => {console.log(err)})
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key]
          });
        }

        const { redirect } = this.state;
        if (redirect) {
          return <Redirect to='/menu'/>;
        }

        return (
            <div className="form_card">
                <form id="product_form" onSubmit={this.onSubmit} encType="multipart/form-data">
                    {formElementsArray.map(formElement => {
                        return (
                            <Input
                                key={formElement.id}
                                id={formElement.id}
                                elementType={formElement.config.elementType}
                                label={formElement.config.label}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                file={formElement.config.file}
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
                value={this.props.btnValue}
                disabled= {!this.state.formIsValid ? true : false}
                >{this.props.btnValue}</button>
            </div>

        )
    }
}

export default ProductForm