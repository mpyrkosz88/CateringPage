import React, {Component} from 'react';
import {Grid} from '@material-ui/core';

//icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
                        <Grid container justify="flex-start">
                                <Grid xs={3} item container justify="flex-start">
                                    <Grid xs={3} item>
                                    {this.state.hide
                                        ? <AddCircleIcon onClick={this.collapse} className="cursor_pointer align-center-icon"/>
                                        : <RemoveCircleIcon onClick={this.collapse} className="cursor_pointer align-center-icon"/>}

                                    </Grid>
                                    <Grid item xs={9} container>
                                    <p>{this.props.lname} {this.props.fname}</p>
                                    </Grid>
                                </Grid>
                                <Grid xs={3} item container justify="center">
                                    <p>{this.props.email}</p>
                                </Grid>
                                <Grid xs={2} item container justify="center">
                                    <p>{this.props.phone}</p>
                                </Grid>
                                <Grid xs={4} item container justify="center">
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