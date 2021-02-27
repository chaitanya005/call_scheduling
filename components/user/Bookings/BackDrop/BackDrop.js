import React from "react"

import styles from './BackDrop.module.sass'


const BackDrop = ( props) => {
    return (
        <div>
            {props.show  ? 
                <div>
                    {props.btn == 'eventDetails' ?  
                        <div>
                            <div className= {styles.ScheduleBackdrop} onClick = {props.clicked}></div>
                        </div>
                    :
                    <div>
                        {props.btn == 'userDetails' ?  
                        <div className= {styles.userDetailsBackdrop} onClick = {props.clicked}></div>  
                    :
                    <div>
                        {props.btn == 'payout' ? 
                            <div className= {styles.userDetailsBackdrop} onClick = {props.clicked}></div>
                        : 
                        <div className= {styles.Backdrop} onClick = {props.clicked}></div> 
                        }
                    </div>
                    }
                    </div>
                    }
                </div> : ''     
            }
        </div>
    )
}

export default BackDrop