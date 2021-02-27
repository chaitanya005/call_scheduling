import React, { Component } from 'react'
import ExportIcon from '../../../../public/images/export.svg'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmptyState from './EmptyState'
import Bookings from './Bookings'
import Pagination from './Pagination'
import Filter from './Filter'
import styles from './BookingsTable.module.sass'
import AppBar from '../../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
// import { getBookings } from './apiCore'
// import {config, getEvents} from './apiCore'
import axios from 'axios'
// import {getUserId} from './Bookings'
import api from './apiCore'
import { CSVLink, CSVDownload } from "react-csv";

class BookingsTable extends Component {
    state = {
        bookings: [],
        categories : [
            {id: 2, category: 'Timebound service' },
            {id: 3, category: 'One Time Event'}, 
            {id: 4, category: 'Product based service'} , 
            {id: 5, category: 'Membership service'},
        ],
        currentPage: 1,
        eventsPerPage: 5,
        searchTerm: '',
        fadeIn: false,
        checkedArray: [],
        myFilters:  {
            category: []
        },
        allEvents: [],
        userId: null,
        flag: 0
    }

    /* getUserId = (response) => {
        console.log('skjdfhk')
        if (response.data.data.user) {
            this.setState({
                userId: response.data.data.user.id
            })
        }else if (response.data.data.userResult) {
            let id = response.data.data.userResult.id
            this.setState({
                userId: id
            }, () => {
                    console.log(this.state.userId)
                    api.getBookings(this.state.userId)
                    .then(res => this.setState({
                        bookings: res.data.data
                    }))
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            return true
        }

        // this.getBookings(this.state.userId)
    }
 */

    loadBookings = () => {
        /* const socialLogin = {
            method: 'post',
            url: 'http://localhost:3000/users/socialLogin',
        } */
        /* axios(Object.assign({}, socialLogin, { data: { email: this.props.email, userName: this.props.name, image: this.props.image } }))
            .then(res => {
                this.getUserId(res)
                console.log(res)
            })
            .catch((err) => console.log(err)) */
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return  nextProps.bookings !== this.props.bookings
    // }


    componentDidMount() {
        // this.loadBookings()
        // this.loadEvents()

        if (localStorage.getItem('userInfo')) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            api.getBookings(data.userId)
            .then(res => this.setState({
                bookings: res.data.data.reverse()
            }))
            .catch(function (error) {
                console.log(error);
            })
        } else {
            'You Need To Login'
        }
    }

    paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        })
    }

    leftArrow = () => {
        this.setState(prev => {
            if (prev.currentPage !== 1) {
                return {
                    currentPage: prev.currentPage - 1
                }
            }  
        })
    }

    rightArrow = () => {
        const total = this.state.allEvents.length
        const eventsPerPage = this.state.eventsPerPage
        this.setState(prev => {
            const lastPage =  Math.ceil(total / eventsPerPage)
            if (prev.currentPage !== lastPage) {
                return {
                    currentPage: prev.currentPage + 1
                }
            }  
        })
    }

    searchingTerm = (events)  => {
        return events.filter(event => 
            event.name && ( 
            event.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())  ||
            event.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()) )
        )
    }

    handleSearch(event) {
        this.setState({searchTerm: event.target.value})
    }

    handleChange = () => {
        const isFade = this.state.fadeIn
        this.setState({
            fadeIn: !isFade
        })
    };

    handleCategory = c => () => {
        const currentCategoryId = this.state.checkedArray.indexOf(c)
        const newCheckedId = [...this.state.checkedArray]
        if (currentCategoryId === -1) {
            newCheckedId.push(c)
        } else {
            newCheckedId.splice(currentCategoryId, 1)
        }
        this.setState({
            checkedArray: newCheckedId
        })
        this.handleFilter(newCheckedId, "category")
    } 

    handleFilter = (filters, filterBy) => {
        const newFilters = this.state.myFilters
        newFilters[filterBy] = filters
        this.setState({
            myFilters: newFilters
        })
    }



    render() {
        // console.log(getUserId)
        let total, eventsPerPage, searchTerm, currentEvents
        let allEvents = this.state.bookings
        if (allEvents) {
        total = allEvents.length
        const indexOfLastEvent = this.state.currentPage *  this.state.eventsPerPage
        const indexOfFirstEvent = indexOfLastEvent  - this.state.eventsPerPage
        currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent)
        eventsPerPage = this.state.eventsPerPage
        searchTerm = this.state.searchTerm
        }
        //allEvents.length = 0;
        // console.log(this.state.bookings)

        const categories = this.state.categories
        return (
            <div>
            <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
            <AppBar />

            <Divider />
            <div className = {styles.Title}>
                <h1>Bookings</h1>
            </div>
            
            <Divider />
            <div className = {styles.BackDrop}>
                <div className = {styles.BookingsTable}>
                {this.state.bookings && this.state.bookings.length !== 0 ? 
                    <div>
                    <div className = {styles.searchItems}>
                        <input 
                        className = {styles.search} 
                        type = 'text'
                        value = {searchTerm}
                        onChange = {(e)  => this.handleSearch(e)}
                        placeholder = 'Search by Event Name'
                        />
                        {/* <Filter 
                        checked = {this.state.fadeIn}
                        clicked = {this.handleChange}
                        categories = {categories}
                        handleCategory = {this.handleCategory}
                        checkedArray = {this.state.checkedArray}
                        len = {this.state.length}
                        /> */}

                        <div className = {styles.export}>
                            <CSVLink data={this.state.bookings} filename={"Seristo_bookings.csv"} style = {{textDecoration: 'none'}}>
                                <Button  color="default" className = {styles.exportbtn}
                                style = {{backgroundColor: '#fff', fontSize: '12px', }}
                                >
                                    <ExportIcon style = {{height: '12px', width: '12px', marginRight: '3px'  }} />Export
                                </Button>
                            </CSVLink>
                        </div>

                    </div>

                    <div className = {styles.columns}>
                        <Grid container spacing={3} className = {styles.columnsGrid}>
                            <Grid item xs={2}>
                            Booking ID
                            </Grid>
                            <Grid item xs={2}>
                            Event Name
                            </Grid>
                            <Grid item xs={2}>
                            Booking Date
                            </Grid>
                            <Grid item xs={2}>
                            Customer Name
                            </Grid>
                            <Grid item xs={2}>
                            Total
                            </Grid>
                            <Grid item xs={2}>
                            Payment Status
                            </Grid>
                        </Grid>
                    </div> 
              
                <Bookings 
                allEvents = {this.searchingTerm(currentEvents)}
                filter = {this.state.myFilters}
                bookings = {this.state.bookings}
                />

                <Pagination 
                eventsPerPage = {eventsPerPage}
                totalEvents = {total}
                paginate = {this.paginate}
                leftArrow = {this.leftArrow}
                rightArrow = {this.rightArrow}
                currPage = {this.state.currentPage} 
                />

                </div>
                : 
                <div>
                    <EmptyState />    
                </div>
                }
                
                
                </div>
            </div>
            </Paper>
            </div>
        )
    }
}

export default BookingsTable