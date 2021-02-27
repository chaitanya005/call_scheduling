// import CustomerView from '../../components/user/EditProfile/customerView'
import Button from '@material-ui/core/Button'
import {loadStripe} from '@stripe/stripe-js'
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useState} from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
}));

const EditProfile = () => {

  const classes = useStyles();
  const [modalBody, setModalBody] = useState(null)
  const [modalStyle] = React.useState({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100vh',
    overflow: 'scroll',
  });

  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const stripePromise = loadStripe('pk_test_51IJkBIKVdNkiM5krzjTWCPi4w0XAJAMBsHiSPdhyuXOVOb01GxHvnKZwcrbtvfWrsoRe9vl7RBjcFgfjmAyjVtQW00BebrYiaY');

    const handleClick = async (event) => {
    // Get Stripe.js instance
    /* const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('http://localhost:3000/users/payment', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: 'muvvalachaitanya05@gmail.com', 
            name: 'test session', 
            price: 50,
            images: ['https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk'],
            listngId: 8
        })
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
    }
    console.log(result)
    localStorage.setItem("result",result) */


    setModalBody(<div style={modalStyle} className={classes.paper}>Hey This is a Modal!!</div>)

    handleOpen()

    };
    
  return (
    <div>
      <Modal
          open={open}
          onClose={handleClose}
      >
        {modalBody}
      </Modal>
      <div>
        <Button onClick={handleClick}>HEyyyyy</Button>
      </div>
    </div>
  );
};

export default EditProfile;
