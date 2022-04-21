import React from 'react';
import  axios from 'axios';
import { Form, Button, Container} from 'react-bootstrap';
import { useState} from "react";
import './AddCompany.css';
import env from "react-dotenv";


/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are added
 */
const AddCompany = () => {
     axios.defaults.withCredentials = true;
    const [message/*, setMessage*/] = useState("")
    const [company, setCompany] = useState("");

    const addCompany = () =>
    {
        if(company !== "") {
             axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `INSERT INTO Companies (name) VALUES ('${company}')` } }).then((response) => {
            }).catch(error => console.error(`Error ${error}`));
        }
    }

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    // const invite = () => {
    //     console.log('INVITING', email)
    //     axios.post("${process.env.REACT_APP_BASE_URL}/users/register",
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

  
  
    return (
        <Container className="EmployerInviteRequestCard uvs-right">

                
                    <h2 className="registerHeader">Add a New Company</h2>
                    <div className="InviteSubtitle font">Type in a company name to add a new company to the list of available companies. </div>
                    <Form className="email Invite">
                    <Form.Group className="company" id="add-company-text" controlId="formEmail">
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
                    <Button className="addButton" variant="secondary" type="button" href="/admin-dash" onClick={addCompany}>Add Company</Button>

            </Form>
        </Container>
    );
}

export default AddCompany;