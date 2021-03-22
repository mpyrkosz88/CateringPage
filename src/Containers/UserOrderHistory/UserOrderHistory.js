import React, { Component } from 'react';
import { connect } from 'react-redux';
//utils
import axios from '../../utils/axios-path';

//components
import History from '../../Components/History/History';

//UI
import Spinner from '../../UI/Spinner/Spinner'

//actions
import * as actions from '../../store/actions/index';

class UserOrderHistory extends Component {

  componentDidMount() {
    if(!this.props.history) {
      this.props.loadUserHistory()
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {

    let historyData = <Spinner />

    if (this.props.history != null) {
      if (this.props.history.length > 0) {
        historyData = <History data={this.props.history}/>
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

const mapStateToProps = state => {
  return {
    history: state.history.history,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserHistory: () => dispatch(actions.loadUserHistory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderHistory);