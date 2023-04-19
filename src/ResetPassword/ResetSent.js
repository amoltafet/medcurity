import React from 'react';
import axios from "axios";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundColor: '#2c3e50',
    position: 'relative',
  },
  triangle: {
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '0 0 100vh 100vw',
    borderColor: 'transparent transparent #FFFFFF transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '350px',
    maxWidth: '90%',
    textAlign: 'center',
    '& > *': {
      marginBottom: '20px',
    },
  },
  formLogo: {
    width: '300px',
    marginBottom: '20px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  formText: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  formField: {
    width: '100%',
    marginBottom: '15px',
  },
  formButton: {
    marginTop: '20px',
    marginLeft: '10px',
    marginRight: '10px',
  },
});

export default function ResetLinkSentPage()
{

  axios.defaults.withCredentials = true;
  const classes = useStyles();
  
  return (
      <div className={classes.root}>
          <div className={classes.triangle}></div>
          <div className={classes.formContainer}>
            <form className={classes.form}>
              <img className={classes.formLogo} src="/Medcurity_Logo.png" alt="" />
              <h3 className={classes.formTitle}>Reset Link Sent</h3>
              <p className={classes.formText}>If the email is registered, then a link will arrive in your inbox shortly.</p>
            </form>
          </div>
      </div>
  );
}
