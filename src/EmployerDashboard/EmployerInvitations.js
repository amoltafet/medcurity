import React from 'react';
import { Form , Card, Button, Container} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './EmployeeCard.css'
import Axios from 'axios';

/**
 * This class allows employers to enter in future user emails.
 * Inputs are validated, then new users are added
 */
const EmployerInvitations = () => {
    Axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    const invite = () => {
        console.log('INVITING', email)
        Axios.post("http://localhost:3002/users/register",
        { 
        email: email,
        }).then((response) => 
        {
        console.log("response.data =", response.data)
        if (response.data === true)
        {
            console.log("A new invitation!")
            navigate('/employer-dash');
        }
        else if (response.data === false)
        {
            console.log("Already has account!")
            setMessage('This email is already associated with an account! Please try a different email.')
        }
        });
    };

    const login = () => {
        navigate('/');
    };
  
    return (
        <Container className="EmployeeInviteRequestCard uvs-right">

                
                    <div className="registerHeader">Employee Invitations</div>
                    <div className="InviteSubtitle font">Type in an email to create an empty account for a prospective employee. They will be able to register using that email.</div>
                    <Form className="email Invite">
                    <Form.Group className="email" controlId="formEmail">
                        <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        onChange={ (e) => 
                        {
                            setEmail(e.target.value);
                        }}/>
                    </Form.Group>
                    <Form.Text className="registerMessage">{message}</Form.Text>
                    <Button className="createButton" variant="secondary" type="button" onClick={invite}>Invite</Button>

            </Form>
        </Container>
    );
}

export default EmployerInvitations;