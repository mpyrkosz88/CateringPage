import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import "./Form.scss"

import axios from '../axios-path';

class Form extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        console.log('axios w formie dziala');
        axios.get('/test')
        .then(res => console.log(res))
    }

    render() {
        return (

            <div className="form_card">
            <form onSubmit={this.onSubmit} id="form">
                <div className="form_input">
                    <label htmlFor="fname">First name</label>
                    <input type="text" id="fname" name="fname" placeholder="First Name"></input>
                </div>
                 <div className="form_input">
                    <label htmlFor="fname">Last name</label>
                    <input type="text" id="lname" name="lname" placeholder="Last name"></input>
                    <p className="form_error">Error msg</p>
                 </div>
                 <div className="form_input">
                 <label htmlFor="address">Address</label>
                 <input type="text" id="address" name="address" placeholder="Address"></input>
                 <p className="form_error">Error msg</p>
                 </div>
                 <div className="form_input">
                 <label htmlFor="city">City</label>
                 <input type="text" id="city" name="addrcityess" placeholder="City"></input>
              </div>
                <div className="form_input">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="E-mail"></input>
                </div>
                <div className="form_input">
                    <label htmlFor="email">Telephone</label>
                    <input type="tel" id="tel" name="tel" placeholder="Telephone"></input>
                </div>
                
            </form>
            <button className="form_button" type="submit" form="form" value="Login"> Login </button>
        </div>
 
        )
    }
}

export default Form

