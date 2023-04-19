import React from 'react';
import { useState } from "react";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
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
    marginBottom: '10px',
  },
  formButton: {
    marginRight: '10px',
  },
  formResponse: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  }
});

export default function RegisterPage() {
  axios.defaults.withCredentials = true;
  const classes = useStyles();
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };

  const register = () => {
    if (email.length > 0 || password.length > 0) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, { email: email, password: password }).then((response) => {
        if (response.data.result === true) {
          setMessage(response.data.message)
          navigate('/dash');
        } else if (response.data.result === false) {
          setMessage(response.data.message.join(" "))
        }
      });
    } else {
      let registerMessage = ""
      if (email <= 0) registerMessage += "Email required. "
      if (password <= 0) registerMessage += "Password required. "
      setMessage(registerMessage)
    }
  };
  
  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <h3 className={classes.formTitle}>Create an Account</h3>
          <p className={classes.formText}>All you need is an email and password to create an account. If you received an invitation, please use the same email you received it.</p>
          <TextField className={classes.formField} label="Email" type="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
          <TextField className={classes.formField} label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
          <p className={classes.formResponse}>{message}</p>
          <Button className={classes.formButton} onClick={register} variant="contained">Create Account</Button>
          <Button className={classes.formButton} onClick={login} variant="text">Back to Login Page</Button>
        </form>
      </div>
    </div>
  );
}
