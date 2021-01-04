//libraries
import React, {Component} from 'react';
import {Grid} from '@material-ui/core';

//icons
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

//utils
import axios from '../../utils/axios-path';

//components
import OrderItem from '../../Components/OrderItem/OrderItem';

//UI
import DatePicker from '../../UI/DatePicker/DatePicker';
import Pagination from '../../UI/Pagination/Pagination';
import Select from '../../UI/Select/Select';

class UserContainer extends Component {

    state = {
        orders: [],
        sort_A_to_Z: true,
        postsPerPage: 5,
        currentPage: 1,
        dateRange: [new Date(), new Date()],
        filteredData:[]
    }

    componentDidMount() {
        let day = new Date();
        day.setDate(day.getDate() + 6)
        this.setState({
            dateRange: [new Date(), day]
        })

        axios
            .get('/get-orders')
            .then(response => {
                const orders = response.data
                this.setState({
                    orders: orders,
                    filteredData: orders
                })
            })
            .then(() => this.changeDateRange(this.state.dateRange))
            .then(() => this.sortByDate())
            .catch((error) => {
                console.log(error);
            })
    }
    
        sortByDate = () => {
        let date = this.state.filteredData
        date.sort((a, b) => {
            if (this.state.sort_A_to_Z) {
                return new Date(b.timeDate) - new Date(a.timeDate)
            }
            else {
                return new Date(a.timeDate) - new Date(b.timeDate)
            }
        })
        this.setState({filteredData: date, sort_A_to_Z: !this.state.sort_A_to_Z})
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

    changeDateRange = (dateRange) => {
        if (dateRange) {
            let timeZoneOffset = (new Date()).getTimezoneOffset() * 60000
            let minRange = new Date((dateRange[0] - timeZoneOffset)).toISOString().slice(0,10);
            let maxRange = new Date((dateRange[1] - timeZoneOffset)).toISOString().slice(0,10);
            const filteredData = this.state.orders.filter((data) => {
                return data.timeDate.slice(0,10) <= maxRange && data.timeDate.slice(0,10) >= minRange
            }) 
            this.setState({
                dateRange: dateRange,
                filteredData: filteredData
            })
        }
        else {
            this.setState({
                dateRange: null,
                filteredData: this.state.orders
            })
        }
    }

    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const orders = (this.state.filteredData
            ? this.state.filteredData.slice(indexOfFirstPost, indexOfLastPost).map((data,index) => {
                return <OrderItem
                    key={index}
                    timeDate={data.timeDate.slice(0,10)}
                    fname={data.userData.fname}
                    lname={data.userData.lname}
                    street={data.userData.street}
                    city={data.userData.city}
                    phone={data.userData.phone}
                    orderData={data.orderData}
                    >
                </OrderItem>
            })

            : <h1>Orders history is empty</h1>)


        return (
            <Grid container>
                <Grid container justify="space-between">
                    <Grid>
                        <Grid container alignItems="center">
                            <Select
                            step="5"
                            maxStep="20"
                            changed={this.recordsPerPageChange}
                            value={this.state.postsPerPage}/>
                            <DatePicker 
                            value={this.state.dateRange}
                            onChange={this.changeDateRange}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Pagination
                        totalPosts={this.state.filteredData.length}
                        postsPerPage={this.state.postsPerPage}
                        currentPage={this.state.currentPage}
                        onChange={this.changePaginationPage}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" className="history_table">
                    <Grid xs={1} item container justify="center" alignItems="center">
                        <p className="table_title">Data</p>
                        {this.state.sort_A_to_Z
                            ? <ArrowDropUpIcon
                                    className="cursor_pointer"
                                    fontSize='large'
                                    onClick={this.sortByDate}/>
                            : <ArrowDropDownIcon
                                className="cursor_pointer"
                                fontSize='large'
                                onClick={this.sortByDate}/>}

                    </Grid>
                    <Grid xs={2} item container justify="center">
                        <p className="table_title">Name</p>
                    </Grid>
                    <Grid xs={2} item container justify="center">
                        <p className="table_title">Adress</p>
                    </Grid>
                    <Grid xs={1} item container justify="center">
                        <p className="table_title">Telephone</p>
                    </Grid>
                    <Grid xs={6} item container justify="center">
                        <Grid xs={7} item container justify="center">
                        <p className="table_title">Products</p>
                        </Grid>
                        <Grid xs={2} item container justify="center">
                        <p className="table_title">Quantity</p>
                        </Grid>
                        <Grid xs={2} item container justify="center">
                        <p className="table_title">Price</p>
                        </Grid>
                        <Grid xs={1} item container justify="center">
                        <p className="table_title">Total</p>
                        </Grid>
                    </Grid>
                </Grid>
                <ul className="history_cart_list">
                {orders}
                </ul>
            </Grid>
        )
    }
}

export default UserContainer