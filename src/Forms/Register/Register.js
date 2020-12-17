//libraries
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

//styles
import "./Register.scss"

//utils
import axios from '../../utils/axios-path';

//components
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Success from '../../Components/Success/Success';


class Register extends Component {

    state = {
        formIsValid: false,
        controls: {
            fname: {
                elementType: 'input',
                label: 'First name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First name',
                    name: 'fname',
                },
                value: '',
                errormsg: 'Minimal length of First name is 3',
                validation: {
                    minLength: 3,
                    required: true,
                },
                valid: false,
                touched: false
            },
            lname: {
                elementType: 'input',
                label: 'Last name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last name',
                    name: 'lname',
                },
                value: '',
                errormsg: 'Minimal length of Last name is 3',
                validation: {
                    minLength: 3,
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                label: 'Street',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    name: 'street',
                },
                value: '',
                errormsg: 'Minimal length of Street name is 3',
                validation: {
                    minLength: 3,
                    required: true,
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                label: 'City',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                    name: 'city',
                },
                value: '',
                errormsg: 'Minimal length of City name is 3',
                validation: {
                    minLength: 3,
                    required: true,
                },
                valid: false,
                touched: false
            },
            number: {
                elementType: 'input',
                label: 'Phone',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Enter your phone number',
                    maxLength: "9",
                    pattern: "[0-9]{9}",
                    name: 'phone',
                },
                value: '',
                errormsg: 'Please type a proper number',
                validation: {
                    required: true,
                    checkedNumber: true,
                    minLength: 9,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                label: 'E-mail',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                    name: 'email',
                },
                value: '',
                errormsg: 'Please type valid e-mail',
                validation: {
                    required: true,
                    checkedEmail: true,
                },
                valid: false,
                touched: false
            },
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
            console.log(errors);
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
            }
        }
    }

    closeModal = () => {
        this.setState({
            modalShow: false,
        }, () => {
            setTimeout(() => {
                this.setState({
                    redirect: true,
                })
            }, 500)
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in this.state.controls) {
            formData.append(key, this.state.controls[key].value)
        }
        axios.post('/register', formData)
            .then(res => console.log(res.data))
            .then(() => this.setState({ modalShow: true }))
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
            return <Redirect to='/menu' />;
        }

        return (
            <div>
                <div className="form_card">
                    <form id="register_form" onSubmit={this.onSubmit} >
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
                        form="register_form"
                        value="Register"
                    disabled= {!this.state.formIsValid ? true : false}
                    > Register </button>
                </div>
                <Modal show={this.state.modalShow}>
                    <Success clickedClosed={this.closeModal}>Register successful! {<br />} Please Log In!</Success>
                </Modal>
                <Backdrop show={this.state.modalShow} clicked={this.closeModal} />
            </div>
        )
    }
}

export default Register

