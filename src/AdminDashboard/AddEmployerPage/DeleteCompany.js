import React from 'react';
import { Form , Card, Button, Container} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './AddCompany.css'
import Axios from 'axios';

/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are Deleteed
 */
const DeleteCompany = () => {
    Axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("")
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const deleteCompany = () =>
    {
        if(company != "") {
            Axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `DELETE FROM Companies WHERE name = '${company}'` } }).then((response) => {
            console.log(response)
            }).catch(error => console.error(`Error ${error}`));
            console.log("We Deleteed")
        }
    }

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    // const invite = () => {
    //     console.log('INVITING', email)
    //     Axios.post("http://localhost:3002/users/register",
    //     { 
    //     email: email,
    //     }).then((response) => 
    //     {
    //     console.log("response.data =", response.data)
    //     if (response.data === true)
    //     {
    //         console.log("A new invitation!")
    //         navigate('/admin-dash');
    //     }
    //     else if (response.data === false)
    //     {
    //         console.log("Already has account!")
    //         setMessage('This email is already associated with an account! Please try a different email.')
    //     }
    //     });
    // };

    const login = () => {
        navigate('/');
    };
  
    return (
        <Container className="EmployerInviteRequestCard uvs-right">

                
                    <h2 className="registerHeader">Delete a New Company</h2>
                    <div className="InviteSubtitle font">Type in a company name to delete a company from the list of available companies. </div>
                    <Form className="email Invite">
                    <Form.Group className="company" id="delete-company" controlId="formCompany">
                        <Form.Control 
                        type="company" 
                        id ="companyTextBox"
                        placeholder="Company Name" 
                        onChange={ (e) => 
                        {
                            setCompany(e.target.value);
                        }}/>
                        
                    </Form.Group>
                    <Form.Text className="registerMessage">{message}</Form.Text>
                    <Button className="addButton" variant="secondary" type="button" href='/admin-dash' onClick={deleteCompany}>Delete Company</Button>

            </Form>
        </Container>
    );
}

export default DeleteCompany;