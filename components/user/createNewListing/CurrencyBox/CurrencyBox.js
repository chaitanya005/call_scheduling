import styles from './styles.module.sass';
import Popover from '@material-ui/core/Popover';
import {useState, useEffect} from 'react';
import currencyService from '../../../../lib/currencyService';

const dollarChar = '\u0024';
const rupeeChar = '\u20B9';

export default function CurrencyBox({formData, formDataUpdater}) {
  let defaultCurrency = currencyService.getDefaultCurrency();
  // console.log('--------'+defaultCurrency+ '----')

  useEffect(() => {
    formDataUpdater({currency: defaultCurrency});
  }, []);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      const data = JSON.parse(localStorage.getItem('userInfo'));
      if (data.currency === 'Rupee') {
        setSymbol(rupeeChar)
        formDataUpdater({currency: 'Rupee'})
      } else {
        setSymbol(dollarChar)
        formDataUpdater({currency: 'dollor'})
      }
    }

    if (localStorage.getItem('DefaultCurrency')) {
      const currency = localStorage.getItem('DefaultCurrency')
      if (currency === 'Rupee') {
        setSymbol(rupeeChar)
        formDataUpdater({currency: 'Rupee'})
      } else {
        setSymbol(dollarChar)
        formDataUpdater({currency: 'dollor'})
      }
    }

  }, [symbol])

  if (formData.currency!==undefined) {
    defaultCurrency = formData.currency;
  }

  let defaultCurrencySymbol = rupeeChar;
  if (defaultCurrency!=='rupee') {
    defaultCurrencySymbol = dollarChar;
  }

  const [symbol, setSymbol] = useState(defaultCurrencySymbol);


  // popover handling starts here
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // popover handling ends here

  function onOptionSelected(value) {
    handleClose();
    formDataUpdater({currency: value});
    if (value==='dollar') {
      setSymbol(dollarChar);
    } else {
      setSymbol(rupeeChar);
    }
  }

  return (
    <div>
      <div onClick={handleClick}
        className={styles.outermost}>
        {symbol}
      </div>
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Options onClick={onOptionSelected}/>
      </Popover> */}
    </div>
  );
};

function Options({onClick}) {
  return (
    <div>
      <div onClick={() => onClick('rupee')}
        className={styles.optionsRow}>Rupees</div>

      <div onClick={() => onClick('dollar')}
        className={`${styles.optionsRow} ${styles.bottomBorder}`}>Dollars</div>
    </div>
  );
}
