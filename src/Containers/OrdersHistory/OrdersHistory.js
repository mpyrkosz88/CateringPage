import React, { Component } from 'react';
//utils
import axios from '../../utils/axios-path';

//components
import History from '../../Components/History/History';

class OrdersHistory extends Component {

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

      render() { 
          return <History data={this.state.history}/> 
        }
}

export default OrdersHistory 