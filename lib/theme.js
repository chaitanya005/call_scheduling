import {createMuiTheme} from '@material-ui/core/styles';
const theme = createMuiTheme({
  shadows: ['none'],
  palette: {
    primary: {
      main: '#2242A4',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Nunito Sans',
    h1: {
      fontSize: 24,
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
      color: '#33393F',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },
    h3: {
      fontSize: 16,
      fontFamily: 'Nunito Sans',
      fontWeight: 300,
      color: '#B5BCC4',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },
    subtitle1: {
      fontSize: 16,
      fontFamily: 'Nunito Sans',
      fontWeight: 400,
      color: '#828282',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },

    subtitle2: {
      fontSize: 16,
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
      color: '#2242A4',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },

    h4: {
      fontSize: 18,
      fontFamily: 'Nunito Sans',
      fontWeight: 700,
      color: '#323A46',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },

    h5: {
      fontSize: 15,
      fontFamily: 'Nunito Sans',
      fontWeight: 300,
      color: '#000000',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },
    h6: {
      fontSize: 12,
      fontFamily: 'Nunito Sans',
      fontWeight: 400,
      color: '#858D95',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },
    h2: {
      fontSize: 14,
      fontFamily: 'Nunito Sans',
      fontWeight: 400,
      color: '#828282',
      letterSpacing: '0.0075em',
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
      alignItems: 'left',
      textAlign: 'left',
    },
  },
  overrides: {
    MuiTextField: {
      //
    },
  },
});

export default theme;
