import React from 'react';
import  axios from 'axios';
import { Form, Button, Row, Card} from 'react-bootstrap';
import { useState} from "react";
import './AddCompany.css';


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
             axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `INSERT INTO Companies (name) VALUES ('${company}')` } }).then((response) => {
            console.log(response)
            }).catch(error => console.error(`Error ${error}`));
            console.log("We added")
        }
    }

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    // const invite = () => {
    //     console.log('INVITING', email)
    //     axios.post("http://localhost:3002/users/register",
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
        <Card className="EmployerInviteRequestCard_add uvs-right  text-center">
                    <Card.Title className="registerHeader_admin_dash"><b>Add a New Company</b></Card.Title>
                    <Card.Subtitle className="InviteSubtitle font">Type in a company name to add a new company to the list of available companies. </Card.Subtitle>
                    
                    <Form className="justify-content-center">
                        <Row className="justify-content-center">
                    <Form.Group className="company_input_admin_dash justify-content-center" id="add-company-text" controlId="formEmail">
                        <Form.Control 
                        className="uvs-left"
                        type="company"
                        id ="companyTextBox"
                        placeholder="Company Name" 
                        onChange={ (e) => 
                        {
                            setCompany(e.target.value);
                        }}/>
                        
                    </Form.Group>
                    <Form.Text className="">{message}</Form.Text></Row>
                    <Button className="addButton uvs-left" type="button" href="/admin-dash" onClick={addCompany}>Add Company</Button>

            </Form>
        </Card>
    );
}

export default AddCompany;