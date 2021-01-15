//libraries
import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';

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

// https://pdfmake.github.io/docs/0.1/
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
        day.setDate(day.getDate() - 6)
        this.setState({
            dateRange: [day, new Date()]
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

    
    exportPDF = () => {

        // http://pdfmake.org/playground.html
        const PDFArray = []
        const tableHeaders = [
            {text: 'Data', style: 'tableHeader'},
            {text: 'Name', style: 'tableHeader'},
            {text: 'Address', style: 'tableHeader'},
            {text: 'Telephone', style: 'tableHeader'},
            {text: 'Products', style: 'tableHeader'},
            {text: 'Quantity', style: 'tableHeader'},
            {text: 'Price', style: 'tableHeader'}, 
            {text: 'Total', style: 'tableHeader'}, 
            ];
        
        const data = this.state.filteredData.map(el=> {
            let totalPrice = 0
            el.orderData.map(data => {
                    let quantity = data.quantity
                    let price = data.price
                    return totalPrice += quantity * price
                })
        return [
            el.timeDate.slice(0,10),
            el.userData.lname  + ' ' + el.userData.fname, 
            el.userData.street + ', ' + el.userData.city,
            el.userData.phone,
            el.orderData.map(el => el.name),
            el.orderData.map(el => el.quantity),
            el.orderData.map(el => el.price),
            totalPrice
        ]
    })

    PDFArray.push(tableHeaders)
    for (let i=0; i<data.length; i++) {
        PDFArray.push(data[i])
    }    
    
        var docDefinition = {
            // a string or { width: number, height: number }
            pageSize: 'A4',
            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'landscape',
            //footer
            footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },

            content: [
                {text: 'Zamówienie na dzień', style: 'header'},
                {
                    table: {
                        headerRows: 1,
                        widths: ['10%', '16%', '16%', '10%' ,'25%', '9%', '7%', '7%'],
                        body: PDFArray,     
                },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? null : '#CCCCCC';
                        }
                    }
                },
            ],
            styles: {
                header: {
                    alignment: 'left',
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                tableHeader: {
                    alignment: 'center',
                    bold: true,
                    fontSize: 14,
                    color: 'black'
                }
            },
            defaultStyle: {
                alignment: 'center',
                fontSize: 12,
                bold: false
              }
        }
 
        pdfMake.createPdf(docDefinition).download();

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
                            <Box ml={4}>
                                <button className="cart_item_button" onClick={() => this.exportPDF()}>Generate Report</button>
                            </Box>
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