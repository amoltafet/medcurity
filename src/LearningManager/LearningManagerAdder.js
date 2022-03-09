import React from 'react';
import { Form , Card, Button, Container} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './LearningManager.css'
import Axios from 'axios';

/**
 * This class allows employers to enter in future user emails.
 * Inputs are validated, then new users are added
 */
const LearningModuleAdder = () => {
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
        <Container className="LearningManagerInviteRequestCard uvs-right">

                
                    <div className="registerHeader">Add a Learning Module: </div>
                    <div className="InviteSubtitle font">Choose a learning module to assign it to all your employees.</div>
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

export default LearningModuleAdder;