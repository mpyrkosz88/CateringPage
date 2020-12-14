//libraries
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

//style
import "./Product.scss"

//utils
import baseUrl from '../../utils/baseURL';

class Product extends Component {
    state = {
        redirect: false
    }

    redirectPage = () => {
        this.setState({ redirect:true })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
          return <Redirect to={`/edit/${this.props.id}`}/>;
        }
        return (
            <Grid item sm={4} container justify="center">
                <div className="card">
                    <h1> {this.props.name}</h1>
                    <figure><img src={baseUrl + this.props.image} /></figure>
                    <h2> {this.props.price} zł</h2>
                    {this.props.editBtnValue ? 
                        <button className="card_button" onClick={()=>this.redirectPage()} value={this.props.editBtnValue }>{this.props.editBtnValue}</button>
                        : null}
                    {this.props.btnValue ? 
                        <button className="card_button" onClick={this.props.clicked} value={this.props.btnValue}>{this.props.btnValue}</button>
                        :null
                    }
                </div>
            </Grid>

        )
    }
}

export default Product
