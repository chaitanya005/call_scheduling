import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EmptyStateIcon from '../../../../public/images/EmptyIcon.svg'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    EmptyIcon: {
        marginTop: "13%",
    },
    info: {
        '& > *': {
            marginTop: '1%',
            fontSize: '16px',
            fontFamily: 'Nunito Sans'
        }
    },
    button: {
            '& > *': {
           marginTop: '5%',
        },
    },

}))

const Empty = () => {
    const styles = useStyles()
    return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    style = {{marginBottom: '13%'}}
    >
        <div className =  {styles.EmptyIcon}>
            <EmptyStateIcon />
        </div>
        <div className =  {styles.info}>
            <div>You don’t have any bookings yet. Once you do, you’ll see them here, along with booking statistcs</div>
        </div>
        <div className = {styles.button}>
            <Button  variant="contained" color="primary">
                Share Listings
            </Button>
        </div>
    </Grid>
    )
}

export default Empty