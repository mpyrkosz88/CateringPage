//libraries
import React, {Component} from 'react';
import {Grid} from '@material-ui/core';

//icons
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

//utils
import axios from '../../utils/axios-path';

//components
import UserHistoryItem from '../../Components/UserHistoryItem/UserHistoryItem';

//containers
import UsersOrdersHistoryList from '../UsersOrdersHistoryList/UsersOrdersHistoryList'

//UI
import Pagination from '../../UI/Pagination/Pagination';
import Select from '../../UI/Select/Select';

class UserContainer extends Component {

    state = {
        users: [],
        sort_A_to_Z: null,
        postsPerPage: 5,
        currentPage: 1
    }

    componentDidMount() {
        axios
            .get('/get-users')
            .then(response => {
                const users = response.data
                this.setState({users: users})
            })
            .then(() => this.sortByLastNameUp())
            .catch((error) => {
                console.log(error);
            })
    }

    sortByLastNameUp = () => {
        let users = this.state.users
        users.sort((a, b) => {
            if (a.userData.lname.toLowerCase() < b.userData.lname.toLowerCase()) {
                return -1;
            }
            if (a.userData.lname.toLowerCase() > b.userData.lname.toLowerCase()) {
                return 1;
            }
            return 0;
        })
        this.setState({users: users, sort_A_to_Z: true})
    }

    sortByLastNameDown = () => {
        let users = this.state.users
        users.sort((a, b) => {
            if (a.userData.lname.toLowerCase() > b.userData.lname.toLowerCase()) {
                return -1;
            }
            if (a.userData.lname.toLowerCase() < b.userData.lname.toLowerCase()) {
                return 1;
            }
            return 0;
        })
        this.setState({users: users, sort_A_to_Z: false})
    }

    recordsPerPageChange = (e) => {
        this.setState({
            postsPerPage: e.target.value,
            currentPage: 1
        })
    }

    changePaginationPage = (e) => {
        this.setState({currentPage: e.target.value})
    }

    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

        const users = (this.state.users
            ? this.state.users.slice(indexOfFirstPost, indexOfLastPost).map(data => {
                return <UserHistoryItem
                    key={data._id}
                    fname={data.userData.fname}
                    lname={data.userData.lname}
                    email={data.email}
                    phone={data.userData.phone}
                    street={data.userData.street}
                    city={data.userData.city}>
                    <UsersOrdersHistoryList id={data._id}/>
                </UserHistoryItem>
            })

            : <h1>Users history is empty</h1>)

        return (
            <Grid container>
                <Grid container justify="space-between">
                    <Select
                    step="5"
                    maxStep="20"
                    changed={this.recordsPerPageChange}
                    value={this.state.postsPerPage}/>

                    <Pagination
                    totalPosts={this.state.users.length}
                    postsPerPage={this.state.postsPerPage}
                    currentPage={this.state.currentPage}
                    onChange={this.changePaginationPage}/>
                </Grid>
                <Grid container alignItems="center" className="history_table">
                    <Grid xs={3} item container justify="center" alignItems="center">
                        <p className="table_title">Name</p>
                        {this.state.sort_A_to_Z
                            ? <ArrowDropUpIcon
                                    className="cursor_pointer"
                                    fontSize='large'
                                    onClick={this.sortByLastNameDown}/>
                            : <ArrowDropDownIcon
                                className="cursor_pointer"
                                fontSize='large'
                                onClick={this.sortByLastNameUp}/>}

                    </Grid>
                    <Grid xs={3} item container justify="center">
                        <p className="table_title">E-mail</p>
                    </Grid>
                    <Grid xs={2} item container justify="center">
                        <p className="table_title">Telephone</p>
                    </Grid>
                    <Grid xs={4} item container justify="center">
                        <p className="table_title">Adress</p>
                    </Grid>
                </Grid>
                {users}
            </Grid>

        )
    }
}

export default UserContainer