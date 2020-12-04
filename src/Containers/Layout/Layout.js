//libraries
import React, { Component } from 'react';
import {Grid} from '@material-ui/core';

// Components
import Navbar from '../../Navigation/Navbar/Navbar'

class Layout extends Component { 
    render() {
        return (
            <div>
                <header className="App-header">
                    <Navbar />
                </header>
                <main>
                    <Grid container justify="center">
                        {this.props.children}
                    </Grid>
                </main>
            </div>
        )
    }
}

export default Layout
