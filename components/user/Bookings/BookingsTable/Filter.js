import React, { Component } from 'react'

import FilterIcon from '../../../../public/images/filter.svg'
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import styles from './BookingsTable.module.sass'


class Filter extends Component {
  
    shouldComponentUpdate(nextState) {
        return nextState.checked !== this.props.checked
    }
    

    render() {
        return (
            <div className = {styles.searchFilter}>
            <Button
                variant="contained" 
                color="default"
                checked={this.props.fadeIn} 
                onClick={this.props.clicked}
                style = {{backgroundColor: '#fff', fontSize: '12px', fontFamily: 'Nunito Sans', border: '1px solid #eee'}}
                className = {styles.FilterBtn}>
                <FilterIcon style = {{height: '12px', width: '12px', marginRight: '3px'  }} />Filter
            </Button>
            <div style = {{display:'flex'}}>
                            <Fade in={this.props.checked}>
                                <Paper 
                                style = {{
                                    position: 'absolute', 
                                    top: '230px', 
                                    zIndex: 1, 
                                    width: '15%', 
                                    marginTop: '-30px',
                                    marginLeft: '-10px',
                                    fontWeight: '600',
                                    lineHeight: '30px', 
                                    border: '1px solid #eee'
                                }}>
                                    <div> 
                                    {this.props.categories.map(cate => 
                                    <div key = {cate.id}>
                                        <input 
                                        type = 'checkbox' 
                                        onChange = {this.props.handleCategory(cate.id)}
                                        value = {this.props.checkedArray.indexOf(cate.id === -1)}
                                        />
                                            {cate.category}
                                    </div>
                                    )}
                                    </div>    
                                </Paper>
                            </Fade>
                        </div>
            </div>
        )
    }
}

export default Filter