//libraries
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//utils
import axios from '../../utils/axios-path';

//components
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Success from '../../Components/Success/Success';

class NewPass extends Component {

  state = {
    formIsValid: false,
    controls: {
      password: {
        elementType: 'input',
        label: 'Password',
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
            name: 'password',
        },
        value: '',
        errormsg: 'Minimal length of password is 6',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    },
    confirmPassword: {
        elementType: 'input',
        label: 'Confirm password',
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
            name: 'cPassword',
        },
        value: '',
        errormsg: "Password doesn't match",
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    },
    redirect: false,
    modalShow: false,
  }

  checkValiditiy(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.checkedEmail) {
      isValid = !((value.indexOf('@', 1) === -1) || (value.indexOf('.', 1) === -1))
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
            touched: true,
        }
    }

    if (updatedControls["confirmPassword"].value === updatedControls["password"].value) {
        updatedControls["confirmPassword"].valid = true
    }
    else {
        updatedControls["confirmPassword"].valid = false
    }

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid })
}


  setErrors = (errors) => {
    const errorsArray = []
    let updatedErrors = this.state.controls
    for (let key in errors) {
        errorsArray.push({
            controls: errors[key].param,
            errormsg: errors[key].msg
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
            if (errorsArray[index].controls === "resetToken") {
              this.setState({ 
                resetTokenError: errorsArray[index].errormsg,
                modalShow: true
              })
            }
        }
    }
}

  closeModal = () => {
    this.setState({
      modalShow: false,
      redirect: true,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in this.state.controls) {
      formData.append(key, this.state.controls[key].value)
    }
    formData.append('resetToken', this.props.match.params.resetToken)

    axios.post('/new-password', formData)
      .then(res => {
        this.setState({
          modalShow: true,
        });
      })
      .catch((err) => {
        if (err.response) {
            const errors = err.response.data
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
      return <Redirect to="/menu/kanapki"/>;
    }
    return (

      <div>
        <div className="form_card">
          <form id="login_form" onSubmit={this.onSubmit}>
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
            form="login_form"
            value="Login"
            disabled={!this.state.formIsValid ? true : false}
          > Change</button>
        </div>
        {!this.state.resetTokenError ?
          (      
            <div>    
            <Modal show={this.state.modalShow}> 
            <Success clickedClosed={this.closeModal}>Password has been changed!</Success> 
            </Modal>
            <Backdrop show={this.state.modalShow} clicked={this.closeModal}/>
            </div>
          )
          :           (    
            <div>      
            <Modal show={this.state.modalShow}> 
            <Success clickedClosed={this.closeModal}>{this.state.resetTokenError}</Success> 
            </Modal>
            <Backdrop show={this.state.modalShow} clicked={this.closeModal}/>
            </div>
          )}

      </div>

    )
  }
}

export default NewPass;
