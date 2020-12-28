import React, {Component} from 'react';
import {Grid, Box} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


import './UserHistoryItem.scss'

class UserHistoryItem extends Component {

    state = {
        hide: true
    }

    collapse = () => {
        this.setState({
            hide: !this.state.hide
        })
    }

    render() {

        let collapse = this.state.hide
        ? "users_history_container"
        :"users_history_container users_history_container_collapse"

        return (
            <Grid container>
                <ul className={collapse}>
                    <div className="main_tab">
                        <Grid container alignItems="center" justify="flex-start">
                                <Grid xs={3} item container justify="flex-start" alignItems="center">
                                {this.state.hide
                                    ? <AddCircleIcon onClick={this.collapse} className="cursor_pointer"/>
                                    : <RemoveCircleIcon onClick={this.collapse} className="cursor_pointer"/>}
                                    <Box m={1} />
                                    <p className="margin-left">{this.props.fname} {this.props.lname}</p>
                                </Grid>
                                <Grid xs={3} item container justify="center" alignItems="center">
                                    <p>{this.props.email}</p>
                                </Grid>
                                <Grid xs={2} item container justify="center" alignItems="center">
                                    <p>{this.props.phone}</p>
                                </Grid>
                                <Grid xs={4} item container justify="center" alignItems="center">
                                    <p>{this.props.street}, {this.props.city}</p>
                                </Grid>
                            </Grid>
                    </div>
                    <ul className="collapse_tab">
                    {this.props.children}           
                    </ul>
                </ul>
            </Grid>

        )
    }
}

export default UserHistoryItem