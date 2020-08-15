import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { showLoading, hideLoading, hideSnackbar } from '../Redux/Actions/Page';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  const { showLoading, hideLoading, hideSnackbar } = props;
  const { snackbar, backdrop } = props;

  const { title, navbar = true } = props;

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar(snackbar);
  };

  const {
    children
  } = props;

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackbar.msg}
        TransitionComponent={(props) => <Grow {...props} />}
      >
        <Alert elevation={6} variant='filled' severity={snackbar.severity}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
      {backdrop <= 0 ? <></> :
        <Backdrop className={classes.backdrop} open={Boolean(backdrop)}>
          <CircularProgress color='inherit' />
        </Backdrop>
      }
      {navbar ?
        <NavBar
          title={title}
          showLoading={showLoading}
          hideLoading={hideLoading}
        /> : <></>
      }
      {children}
    </div>
  );
};

const mapStateToProps = state => ({
  snackbar: state.page.snackbar,
  backdrop: state.page.backdrop
});

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
  hideSnackbar
})(Layout);