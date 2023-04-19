import React from 'react';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  },
  formButton: {
    marginLeft: '10px',
    marginRight: '10px',
  },
});

export default function ResetPasswordPage() {
  axios.defaults.withCredentials = true;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState(null);
  const [useridDetail, setUseridDetail] = useState(null);
  const [emailDetail, setEmailDetail] = useState(null);
  const [tokenIsExpired, setTokenIsExpired] = useState(null);
  const [inputtedEmail, setInputtedEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    if (queryParameters.has("token")) {
      var token = queryParameters.get("token");

      axios.post(`${process.env.REACT_APP_BASE_URL}/email/getDetailsFromPasswordResetToken`,
      {
        token: token
      }).then((response) => {
        if (response.data.length !== 0) { // token exists in the database
          setTokenExists(true);
          setUseridDetail(response.data[0].userid);
          setEmailDetail(response.data[0].email);
          var currDateObj = new Date();
          var expDateObj = new Date(response.data[0].expirationdate);
          if (currDateObj.getTime() >= expDateObj.getTime()) { // token has expired
            setTokenIsExpired(true);
          } else { // token has not expired yet
            setTokenIsExpired(false);
          }
        } else { // token doesn't exist in the database
          setTokenExists(false);
        }
        setIsLoading(false);
      });
    }
  }, []);

  const login = () => {
    navigate('/');
  };

  const redo = () => {
    navigate('/resetPassword');
  };

  const sendResetLink = () => {
    // First, find out if the inputted email exists in the database
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, {
      params: {
          the_query:
              `SELECT userid, email FROM users WHERE email = '${inputtedEmail}'`
      }
    }).then((response) => {
      if (response.data.length !== 0) {
        var userid = response.data[0].userid;
        var useremail = response.data[0].email;
        // Next, construct a password reset token and add it to the database alongside userid and an expiration time/date
        // Then, send a password reset link to the inputted email
        axios.post(`${process.env.REACT_APP_BASE_URL}/email/addPasswordResetToken`,
        {
            userid: userid,
            email: useremail
        }).then((response) => {
        });
      }
    });
    setTimeout(() => navigate('/resetLinkSent'), 500);
  };

  const confirmReset = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/users/resetUserPassword`,
    {
      userid: useridDetail,
      newPassword: newPassword
    }).then((response) => {
    });
    setTimeout(() => navigate('/resetConfirmed'), 500);
  };
  
  if (queryParameters.has("token")) {

    if (isLoading) {
      return (
        <></>
      );
    } else {
      if (tokenExists) {
        if (tokenIsExpired) {
          return (
            <>
            <Form className="reset_passwordbg img-fluid">
            <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
            <Form className="reset_password_columnDivder"> 
                  <div className="row justify-content-md-center">
                    <div className="col-xs-5 col-md-5">
                      <div className="reset_password_formColumn row justify-content-center">
                        <h3 className="reset_password_h3">There's been an error...</h3>
                        <p className="reset_password_p">That link has expired. Try again below:</p>
                        <Button className="send_code_button" onClick={redo} variant="secondary" type="button">Send Another Reset Link</Button>
                      </div>
                    </div>
                  </div>
              </Form>
            </Form>
            </>
          );
        } else {
          return (
            <>
            <Form className="reset_passwordbg img-fluid">
            <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
            <Form className="reset_password_columnDivder"> 
                  <div className="row justify-content-md-center">
                    <div className="col-xs-5 col-md-5">
                      <div className="reset_password_formColumn row justify-content-center">
                        <h3 className="reset_password_h3">Reset Password</h3>
                        <p className="reset_password_p">Enter the new password for {emailDetail} below.</p>
                        <Form.Group className="reset_password_Form" controlId="formEmail"> <Form.Control type="password" placeholder="New Password" onChange={(e) => {setNewPassword(e.target.value);}}/> </Form.Group>
                        <p></p>
                        <Button className="send_code_button" onClick={confirmReset} variant="secondary" type="button">Confirm Password Reset</Button>
                      </div>
                    </div>
                  </div>
              </Form>
            </Form>
            </>
          );
        }
      } else {
        return (
          <>
          <Form className="reset_passwordbg img-fluid">
          <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
          <Form className="reset_password_columnDivder"> 
                <div className="row justify-content-md-center">
                  <div className="col-xs-5 col-md-5">
                    <div className="reset_password_formColumn row justify-content-center">
                      <h3 className="reset_password_h3">There's been an error...</h3>
                      <p className="reset_password_p">That link didn't seem to work. Try again below:</p>
                      <Button className="send_code_button" onClick={redo} variant="secondary" type="button">Send Another Reset Link</Button>
                    </div>
                  </div>
                </div>
            </Form>
          </Form>
          </>
        );
      }
    }
    
  } else {
    return (
        <>
        <Form className="reset_passwordbg img-fluid">
        <Image className="medcurity_logo justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
        <Form className="reset_password_columnDivder"> 
              <div className="row justify-content-md-center">
                <div className="col-xs-5 col-md-5">
                  <div className="reset_password_formColumn row justify-content-center">
                    <h3 className="reset_password_h3">Reset Password</h3>
                    <p className="reset_password_p">Enter your email below to receive a password reset link.</p>
                    <Form.Group className="reset_password_Form" controlId="formEmail"> <Form.Control type="email" placeholder="Email" onChange={(e) => {setInputtedEmail(e.target.value);}}/> </Form.Group>
                    <p></p>
                    <Button className="send_code_button" onClick={sendResetLink} variant="secondary" type="button">Send Password Reset Link</Button>
                    <Button className="reset_password_button" onClick={login} variant="secondary" type="button">Back to Login Page</Button>
                  </div>
                </div>
              </div>
          </Form>
        </Form>
        </>
    );
  }

}
