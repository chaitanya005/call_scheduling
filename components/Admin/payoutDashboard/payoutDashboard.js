import React from 'react'
import styles from './payoutDashboard.module.sass'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ExportIcon from '../../../public/images/export.svg'
import Grid from '@material-ui/core/Grid';

const payoutDasboard = () => {
    return (
        <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>

            <div className = {styles.title}>
                <h1>Payout</h1>
            </div>


            <Divider />

            <div className = {styles.BackDrop} style = {{display: 'flex', flexDirection: 'column'}}>
                <Paper style = {{marginLeft: '3%', marginTop: '3%', width: '93%'}}>
                    <div className = {styles.flexDisplay}>
                        <div className = {styles.pendingDiv}>
                            <div className = {styles.status}>Payout Pending</div>
                            <div className = {styles.amtPending}>$ 5</div>
                        </div>
                        <div className = {styles.amountDiv}>
                            <div className = {styles.status}>Processed Payouts</div>
                            <div className = {styles.completed}>$ 50</div>
                        </div>
                    </div>

                </Paper>



                <div className = {styles.BookingsTable}>
                    <div className = {styles.searchItems}>
                        <input 
                            className = {styles.search} 
                            type = 'text'
                            placeholder = 'Search'
                        />

                        <div className = {styles.export}>
                            <Button  color="default" className = {styles.exportbtn}
                            style = {{backgroundColor: '#fff', fontSize: '12px'}}
                            >
                                <ExportIcon style = {{height: '12px', width: '12px', marginRight: '3px'  }} />Filter
                            </Button>
                        </div>
                       

                        <div className = {styles.export}>
                            <Button  color="default" className = {styles.exportbtn}
                            style = {{backgroundColor: '#fff', fontSize: '12px'}}
                            >
                                <ExportIcon style = {{height: '12px', width: '12px', marginRight: '3px'  }} />Export
                            </Button>
                        </div>

                    </div>

                    <div className = {styles.columns}>
                        <Grid container spacing={3} className = {styles.columnsGrid}>
                            <Grid item xs={2}>
                            Payout ID
                            </Grid>
                            <Grid item xs={2}>
                            Customer Name
                            </Grid>
                            <Grid item xs={2}>
                            Amount
                            </Grid>
                            <Grid item xs={2}>
                            Requested Date
                            </Grid>
                            <Grid item xs={2}>
                            Account Details
                            </Grid>
                            <Grid item xs={2}>
                            Payment Status
                            </Grid>
                        </Grid>
                    </div>

                    <div className={styles.rows}>
                            <div>
                                <Grid
                                container spacing={3}
                                className={styles.rows}
                            >
                                <Grid item xs={2}>
                                        <div style={{ color: '#2242A4', textDecoration: 'none', cursor: 'pointer' }}>
                                        #P971</div>
                                </Grid>
                                <Grid item xs={2}>
                                    Rakesh
                                    <div className={styles.addition}></div>
                                </Grid>
                                <Grid item xs={2}>
                                    ₹ 1500.00
                                </Grid>
                                <Grid item xs={2}>
                                    05/12/12
                                </Grid>
                                <Grid item xs={2}>
                                    <button style = {{all: 'unset', textDecoration: 'underline'}}>Details</button>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className={styles.badge} style={{ backgroundColor: '#FEADA5' }}>
                                       Payment Failed
                                    </div>
                                </Grid>
                                <hr style={{ width: '98%' }} />
                            </Grid>
                            </div>
                        </div>
                </div>
            </div>

        </Paper>
    )
}

export default payoutDasboard