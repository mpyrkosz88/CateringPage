//libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

//utils
import axios from '../../utils/axios-path';
import baseUrl from '../../utils/baseURL';

//components
import Input from '../../UI/Input/Input';

class Edit extends Component {

    state = {
        formIsValid: true,
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
                valid: true,
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
                valid: true,
                touched: false
            },
            image: {
                elementType: 'image',
                label: 'Change image',
                elementConfig: {
                    type: 'file',
                    name: 'image',
                },
                file: null,
                src: null,
                errormsg: 'Please add image',
                validation: {
                    required: true,
                },
                valid: true,
            },
        },
        redirect: false,
    }

    componentDidMount() {
        axios.get('/edit/'+ this.props.match.params.id)
        .then(response => {
            const updatedControls = {
                ...this.state.controls,
                name: {
                    ...this.state.controls.name,
                    value: response.data.name
                },
                price: {
                    ...this.state.controls.price,
                    value: response.data.price
                },
                image: {
                    ...this.state.controls.image,
                    src: response.data.image,
                }
            }
            this.setState({ controls: updatedControls})
        })
          .catch((error) => {
            console.log(error);
          })
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

    redirectPage = () => {
        this.setState({ redirect:true })
    }

    setErrors = (errors) => {
      const errorsArray = []
      let updatedErrors = this.state.controls
      for (let key in errors) {
          errorsArray.push({
              controls: key,
              errormsg: errors[key].message
          });
      }
  
      for (let inputIdentifier in this.state.controls) {
          for (let index in errorsArray) {
              if (errorsArray[index].controls === inputIdentifier) {
                  updatedErrors = {
                      ...this.state.controls,
                      [inputIdentifier]: {
                          ...this.state.controls[inputIdentifier],
                          errormsg: errorsArray[index].errormsg,
                          valid: false,
                          touched: true
                      }
                  }
                  this.setState({ controls: updatedErrors, formIsValid: false})
              }
          }
      }
  }
      
    onSubmit = (e) => {
      e.preventDefault();
      let formData = new FormData();
      if (this.state.controls.image.file !== null) {
          formData.append('image', this.state.controls.image.file[0]);
    }
      formData.append('name', this.state.controls.name.value);
      formData.append('price', this.state.controls.price.value);
        axios.post('/update/' + this.props.match.params.id, formData)
        .then(res => {console.log(res.data)})
        .then(() => this.redirectPage())
        .catch((err) => {
          if (err.response) {
              const errors = err.response.data.errors
              this.setErrors(errors)
          }
          else {
              console.log(err);
          }
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

        const { redirect } = this.state;
        if (redirect) {
          return <Redirect to='/menu'/>;
        }

        let image 
        
        if(this.state.controls.image.src !== null) {
          if(this.state.controls.image.file === null) {
            image = <figure><img src={baseUrl + this.state.controls.image.src} /></figure>
          }
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
                        {image}
                        </form>

                <button className="form_button" 
                type="submit" 
                form="product_form" 
                value="Update"
                disabled= {!this.state.formIsValid ? true : false}
                >Update
                </button>
                <button className="form_button"
                type="button" 
                value="Cancel"
                onClick={()=>this.redirectPage()}
                >Cancel</button>
            </div>

        )
    }
}

export default Edit