import React, { Component } from 'react';
//utils
import axios from '../../utils/axios-path';

//components
import History from '../../Components/History/History';

//UI
import Spinner from '../../UI/Spinner/Spinner'

class AdminUsersOrdersHistoryList extends Component {

    state = {
        history: null,
    }

    componentDidMount() {
        axios.get('/get-users/' + this.props.id)
            .then(response => {
                if (response.data) {
                    this.setState({ history: response.data })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {

        let historyData = <Spinner />

        if (this.state.history != null) {
            if (this.state.history.length > 0) {
                historyData =  <History data={this.state.history} />
                }
            else {
                historyData = <h1>History data list is empty</h1>
            }
        }
        else {
            historyData = <Spinner />
        }

        return historyData
    }
}

export default AdminUsersOrdersHistoryList