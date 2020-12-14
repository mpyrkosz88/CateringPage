//libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

//utils
import axios from '../../utils/axios-path';

//components
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Success from '../Success/Success';

//actions
import * as actions from '../../store/actions/auth';

class Login extends Component {

  state = {
    formIsValid: false,
    controls: {
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
      isValid = !((value.indexOf('@', 1) == -1) || (value.indexOf('.', 1) == -1))
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

  closeModal = () => {
    this.setState({
      modalShow: false,
      redirect: true,
    },() => {
        this.props.authSuccess(this.state.token, this.state.userId, this.state.authRole)
    }
    )
  }

  onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in this.state.controls) {
      formData.append(key, this.state.controls[key].value)
    }

    axios.post('/login', formData)
      .then(res => {
        const resData = res.data
        this.setState({
          token: resData.token,
          userId: resData.userId,
          authRole: resData.userRole,
          modalShow: true,
        });
      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      localStorage.setItem('authRole', resData.userRole);
      const remainingTime = 60 * 60 * 1000;
      const expirationDate = new Date(
          new Date().getTime() + remainingTime
        );
      localStorage.setItem('expirationDate', expirationDate.toISOString());
      })
      .catch((err) => { console.log(err) })
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
          > Login </button>
        </div>
          <Modal show={this.state.modalShow}> 
            <Success clickedClosed={this.closeModal}>Login successful!</Success> 
          </Modal>
          <Backdrop show={this.state.modalShow} clicked={this.closeModal}/>
      </div>

    )
  }
}

// const mapStateToProps = (state, props) => {
//   return {
//     token: state.token,
//     userId: state.userId,
//     authRole: state.authRole,
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: (token, userId, authRole) => dispatch(actions.authSuccess(token, userId, authRole)),
  }
}

export default connect(null, mapDispatchToProps)(Login);
