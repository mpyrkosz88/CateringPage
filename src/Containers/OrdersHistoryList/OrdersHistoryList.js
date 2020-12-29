import React, { Component } from 'react';
//utils
import axios from '../../utils/axios-path';

//components
import History from '../../Components/History/History';

class OrdersHistoryList extends Component {

  state = {
    history: []
}

componentDidMount() {
    axios
        .get('/get-users/' + this.props.id)
        .then(response => {
            const history = response.data
            this.setState({history: history})
        })
        .catch((error) => {
            console.log(error);
        })
}

      render() { 
          return <History data={this.state.history}/> 
        }
}

export default OrdersHistoryList