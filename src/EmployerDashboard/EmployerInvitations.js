import React from 'react';
import { Form, Card, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import './EmployerInvitations.css'
import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
// import env from "react-dotenv";

/**
 * This class allows employers to register empty user accounts
 * that employees can register into
 * Inputs are validated, then new users are added
 * @param {int} companyId
 * @param {function} setReload()
 */
const EmployerInvitations = (props) => {
    axios.defaults.withCredentials = true;

    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (Number.isInteger(props.companyId)) {
            setLoading(false)
        }
    }, [props.companyId])

    /**
     * This function creates a new basic user account.
     * First it tries to register a user, if this fails then
     * it will print out the error message. If it succeeds 
     * it will trigger a reload of page data
     * 
     */
    const invite = () => {
        if (!isLoading) {
            // console.log('INVITING', email)
            // axios.post(`${process.env.REACT_APP_BASE_URL}/users/registerEmpty`,
            //     {
            //         email: email,
            //         companyid: String(props.companyId),
            //     }).then((response) => {
            //         // console.log("response.data =", response.data)
            //         if (response.data.result === true) {
            //             console.log("A new invitation!")
            //             setMessage("")
            //             props.setReload(true)
            //         }
            //         else {
            //             console.log("Already has account!")
            //             setMessage(response.data.message)
            //         }
            //     });

            axios.post(`${process.env.REACT_APP_BASE_URL}/email/sendEmployeeInvitation`,
            {
                email: email
            }).then((response) => {
                // console.log(response);
            });
        }
    };

    return (
        <div className=" uvs-right" style={{
            backgroundColor: '#F5F5F5',
            marginTop: '4rem',
            marginRight: '5rem',
        }}>
                  <Typography variant="h3" gutterBottom style={{
                    paddingTop: '1rem',
                    paddingLeft: '2rem',
                  }}>
                    Invite Employees
                    </Typography>
                    <Card.Subtitle className="empolyee_invite_subtitle">Type in an email to create an empty account for a prospective employee. They will be able to register using that email.</Card.Subtitle>
                    <Form className="email_employee_invite">
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className="uvs-left"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} 
                                style={{
                                    width: '32rem',
                                    marginLeft: '2rem',
                                }}
                                />
                        </Form.Group>
                        <Form.Text className="register_employee_message">{message}</Form.Text>
                    </Form>
               
                    <Button variant='contained' color='primary' onClick={invite} style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        marginLeft: '2rem',
                    }}>Invite</Button>
        </div>
    );
}

export default EmployerInvitations;