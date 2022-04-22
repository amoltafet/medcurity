import React from 'react';
import { Form , Card, Button, Row, Container, Col} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './AdminInvitations.css'
import axios from 'axios';
// import env from "react-dotenv";

/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are added
 */
const AdminInvitations = () => {
    axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [companies, setCompanies] = useState("")
    const [userCompany, setUserCompany] = useState(1)
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `SELECT * FROM Companies ` } }).then((response) => {
            setCompanies(response.data)
            // console.log("Companies from Admin invitations:", response.data)
            }).catch(error => console.error(`Error ${error}`));
        },[])

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    const invite = () => {
        // // console.log('INVITING', email)
        // axios.post("${process.env.REACT_APP_BASE_URL}/users/register",
        // { 
        // email: email,
        // }).then((response) => 
        // {
        // // console.log("response.data =", response.data)
        // if (response.data === true)
        // {
        //     // console.log("A new invitation!")
        //     navigate('/admin-dash');
        // }
        // else if (response.data === false)
        // {
        //     // console.log("Already has account!")
        //     setMessage('This email is already associated with an account! Please try a different email.')
        // }
        // });
        
        // for(var i = 0; i < companies.length; i++) {
        //     if(userCompany === companies[i].companyid) {
        //         let userName = companies[i].name
        //     }
        // }
        // const addCompany = () =>
        // {
        //     axios.get('${process.env.REACT_APP_BASE_URL}/api/getQuery', { params: { the_query: `INSERT INTO Companies (name) VALUES ('${company}')` } }).then((response) => {
        //     // console.log(response)
        //     }).catch(error => console.error(`Error ${error}`));
        //     // console.log("We added")
        // }
        // console.log("Email:", email)
        // console.log("")
        if(email !== "") {
            axios.post(`${process.env.REACT_APP_BASE_URL}/users/registerCompanyAdmin`, { email: email, companyid: userCompany }).then((response) =>
            {
            })
        }   
    };
  
    function createDropDownOptions() {
        const dropdownList = [];
        for (let index in companies) {
            let item = companies[index];
            dropdownList.push(<option className="companyList" value={item.companyid}>{item.name}</option>); 
        }
        return dropdownList;
    }

    return (
        <Card className="EmployerInviteRequestCard uvs-right text-center" >
            <Card.Title className="registerHeader_admin_dash"><b>Employer Invitations</b></Card.Title>
            <Card.Subtitle className="InviteSubtitle font">Type in an email to create an empty account for a prospective Employer. They will be able to register using that email.</Card.Subtitle>
            <Row className="justify-content-center" style={{display: 'flex', flexDirection: 'row' }}>
                <Col xs={4} lg={5} className="justify-content-center">
                    <Form className="">
                        <Form.Group className="email_form_admin" id="email-invite" controlId="formPlaintextEmail">
                            <Form.Control
                            className="uvs-left" 
                            type="email" 
                            id ="emailTextBox"
                            placeholder="Email" 
                            onChange={ (e) => 
                            {
                                setEmail(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Text className="">{message}</Form.Text>

                    </Form>
                    <Button className="createButton uvs-left" type="button" onClick={invite} href='/admin-dash'>Invite</Button>
                </Col>
                <Col xs={3} lg={5} className="justify-content-center">
                    <Row>
                    <label className="list_text_companies" htmlFor="company-list" id='company-label'>
                        Company List:
                    </label>
                    </Row>
                    <Row>
                    <select id="company-list" size={5} multiple={false}
                        onChange={ (e) => 
                        {
                            setUserCompany(e.target.value)
                        }}>
                        {createDropDownOptions()}
                    </select>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default AdminInvitations;