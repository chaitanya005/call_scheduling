import Button from '@material-ui/core/Button';


export default function Stepper({state, onClickHandler}) {
  const defaultColor = {
    listing: 'default', checkout: 'default', share: 'default',
  };
  defaultColor[state] = 'primary';
  const color = defaultColor;

  function clickHandler(e, buttonName) {
    onClickHandler(buttonName);
  };
  return (
    <div style={{display: 'flex', justifyContent: 'center',
      flex: '1', margin: '5px 15px'}}>
      <Button style={{flex: '1', borderRadius: '0px'}}
        color={color.listing} onClick={(e) => clickHandler(e, 'listing')}
        variant='contained'>
          Class / Workshop
      </Button>
      <Button style={{flex: '1', borderRadius: '0px'}}
        color={color.checkout} onClick={
          (e) => clickHandler(e, 'checkout')}
        variant='contained'>
          Checkout
      </Button>
      <Button style={{flex: '1', borderRadius: '0px'}}
        color={color.share} onClick={(e) => clickHandler(e, 'share')}
        variant='contained'>
          Share
      </Button>

    </div>
  );
};

