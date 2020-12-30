import React, { Component } from 'react';
//utils
import axios from '../../utils/axios-path';

//components
import History from '../../Components/History/History';

class OrderHistory extends Component {

    state = { 
        history: []
    }
    
    componentDidMount() {
        axios.get('/get-orders-history')
          .then(response => {
              const history = response.data
              this.setState({history: history})
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
          return <History data={this.state.history}/> 
        }
}

export default OrderHistory 