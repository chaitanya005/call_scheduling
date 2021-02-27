import React, { Component } from 'react'
import LeftArrow from '../../../../public/images/leftarrows.svg'
import RightArrow from '../../../../public/images/rightarrow.svg'
import styles from './BookingsTable.module.sass'


class Pagination extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.currPage !== this.props.currPage
    // }

    

    render() {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(this.props.totalEvents / this.props.eventsPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div className = {styles.pagination}>

        <div className = {styles.paginationItems} onClick = {() => this.props.leftArrow()} style = {{backgroundColor: '#fff', color: '#000'}}>
            <a href  = '#' onClick = {() => this.props.leftArrow()}>
                <LeftArrow />
            </a>
        </div>
        {pageNumbers.map(num => ( 
            
            <div key = {num}>
            {num === this.props.currPage ? 
                
                <div className = {styles.paginationNumbers} key = {num} onClick = {() => this.props.paginate(num)}>
                    <a href = '#' onClick = {() => this.props.paginate(num)} style = {{color: "#fff", textDecoration: 'none'}}>{num}</a>
                </div> 
                :
                <div className = {styles.paginationNumbers} key = {num} onClick = {() => this.props.paginate(num)} style = {{backgroundColor: "#fff"}}>
                    <a href = '#' onClick = {() => this.props.paginate(num)} style = {{color: "#484F56", textDecoration: 'none'}}>{num}</a>
                </div>
            }
                
            </div>
        ))}
               
        <div className = {styles.paginationItems} onClick = {() => this.props.rightArrow()} style = {{backgroundColor: '#fff', color: '#000'}}>
            <a href  = '#' onClick = {() => this.props.rightArrow()}>
                <RightArrow />
            </a>
        </div>
            </div>
    )
        }
}

export default Pagination