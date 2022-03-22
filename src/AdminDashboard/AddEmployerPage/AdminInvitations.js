import React from 'react';
import { Form , Card, Button, Container, Col} from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import './EmployerCard.css'
import Axios from 'axios';

/**
 * This class allows Admins to enter in future user emails.
 * Inputs are validated, then new users are added
 */
const AdminInvitations = () => {
    Axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [companies, setCompanies] = useState("")
    const [userCompany, setUserCompany] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `SELECT * FROM Companies ` } }).then((response) => {
            setCompanies(response.data)
            console.log("Companies from Admin invitations:", companies)
            }).catch(error => console.error(`Error ${error}`));
        },[])

    /**
     * This function creates a new basic user account.
     * First it trys to register a user, then it 
     * 
     */
    const invite = () => {
        // console.log('INVITING', email)
        // Axios.post("http://localhost:3002/users/register",
        // { 
        // email: email,
        // }).then((response) => 
        // {
        // console.log("response.data =", response.data)
        // if (response.data === true)
        // {
        //     console.log("A new invitation!")
        //     navigate('/admin-dash');
        // }
        // else if (response.data === false)
        // {
        //     console.log("Already has account!")
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
        //     Axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `INSERT INTO Companies (name) VALUES ('${company}')` } }).then((response) => {
        //     console.log(response)
        //     }).catch(error => console.error(`Error ${error}`));
        //     console.log("We added")
        // }

        Axios.post("http://localhost:3002/users/registerCompanyAdmin", { email: email, companyid: userCompany }).then((response) =>
        {
            console.log("Reponding from invite", response)
        })
    };

    const login = () => {
        navigate('/');
    };
  
    function createDropDownOptions() {
        const dropdownList = [];
        for (let index in companies) {
            let item = companies[index];
            dropdownList.push(<option classname="companyList font" value={item.companyid}>{item.name}</option>); 
        }
        return dropdownList;
    }

    return (
        <Container className="EmployerInviteRequestCard uvs-right" >
            <div className="registerHeader">Employer Invitations</div>
            <div className="InviteSubtitle font">Type in an email to create an empty account for a prospective Employer. They will be able to register using that email.</div>
            <Container className='EmployerInviteContent' style={{display: 'flex', flexDirection: 'row' }}>
                <Col>
                    <Form className="emailInvite">
                        <Form.Group className="email" controlId="formEmail">
                            <Form.Control 
                            type="email" 
                            id ="emailTextBox"
                            placeholder="Email" 
                            onChange={ (e) => 
                            {
                                setEmail(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Text className="registerMessage">{message}</Form.Text>

                    </Form>
                </Col>
                <label htmlFor="company-list">
                    Company List:
                    <select className="learningModule" multiple={false}
                        onChange={ (e) => 
                        {
                            setUserCompany(e.target.value)
                            console.log(e.target.value);
                        }}>
                        {createDropDownOptions()}
                    </select>
                </label>
            </Container>
            <Button className="createButton" variant="secondary" type="button" onClick={invite}>Invite</Button>
        </Container>
    );
}

export default AdminInvitations;