import {Button, Image, Form} from 'react-bootstrap'
import React from 'react';
import { useState, useEffect} from "react";
import axios from "axios"
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
// import env from "react-dotenv";

/**
* Creates and displays the main login page. 
* @return {LoginPage}
*/

export default function LoginPage()
{
  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileView, setMobileView] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });
  const navigate = useNavigate();

//// console.log("FROM LOGIN PAGE:", process.env.REACT_APP_BASE_URL)
  
  // get the user's session to see if they're already logged in. If so,
  // redirect them to their dashboard...
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/login`).then((response) => {
      if (response.data.user)
      {
        setCurrentUser(response.data.user[0])
      }
      else
      {
        setCurrentUser(null)
      }
    }).catch(error => console.error(`Error ${error}`)); }, []);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
  },[])

  const login = () => {    

    if (email.length > 0 || password.length > 0)
    {
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email: email, password: password }).then((response) => 
      {
        if (response.data.success === true)
        {
          setMessage(response.data.message)
          navigate('/dash');
        }
        else if (response.data.success === false)
        {
          setMessage(response.data.message)
        }
      });
    }
    else
    {
      let loginMessage = ""
      if (email <= 0) loginMessage += "Email required. "
      if (password <= 0) loginMessage += "Password required. "
      setMessage(loginMessage)
    };
  }

  const register = () => {
    navigate('/register');
  };

  const dashRedirect = () => {
    navigate('/dash');
  };
 
  if (mobileView) {
    return 
  }
 
  if (!currentUser)
  {
    return (
      <>
      <Form className="loginbg img-fluid">
        <Image className="MedcurityLogo_login justify-content-bottom" variant="top" src="/triangle_logo.png" alt="" />
        <div className="login_pageHeader">
          <h1 className="login_pageHeaderText">Welcome to Medcurity Learn Security</h1>
        </div>
        <Form className="login_columnDivder"> 
            <div className="row justify-content-md-center">
              <div className="col-xs-5 col-md-5">
                <div className="login_formColumn row justify-content-center">
                  <h3 className="login_h3">Login to your account.</h3>
                  <p className="login_p">To access your Medcurity Learn Security Dashboard, please enter your login credentials.</p>
                  <Form.Group className="login_Form" controlId="formEmail"> <Form.Control type="email" placeholder="Email" onChange={ (e) => {setEmail(e.target.value); }}/> </Form.Group>
                  <p></p>
                  <Form.Group className="login_Form" controlId="formPassword"> <Form.Control type="password" placeholder="Password" onChange={ (e) => {setPassword(e.target.value); }}/> </Form.Group>
                  <p className="login_loginResponse">{message}</p>
                  <Button className="login_formButton" onClick={login} variant="secondary" type="button">Login with Existing Account</Button>    
                  <Button className="login_forgotPass" href="/resetPassword" variant="secondary" type="button">Forgot password?</Button>
                </div>
              </div>
              <div class="col-xs-5 col-md-5">
               <div class="login_formColumn row justify-content-center">
                  <h3 class="login_h3">Need an account? Got an invitation?</h3>
                  <p class="login_p">Creating a new account is quick and easy. Get started here!</p>
                  <Button className="login_formButton" onClick={register} variant="secondary" type="button">Register a New Account</Button>
                </div>
              </div>
            </div>
        </Form>
      </Form>
      </>
  );
  }
  else
  {
    return (
      <>
        <body onLoad={dashRedirect()}>
          <p>Redirecting...</p>
        </body>
      </>
    )

  }
}

