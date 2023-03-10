import React from 'react';
import { Form, Card, Button, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import './EmployerInvitations.css'
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
        <Card className="Employee_Invite_Request_Card uvs-right">
                <Row xs={7} md={12} lg={12}> 
                    <Card.Title className="register_employee_header"><b>Employee Invitations</b></Card.Title>
                </Row>
                <Row xs={7} md={7} lg={7}>
                    <Card.Subtitle className="empolyee_invite_subtitle">Type in an email to create an empty account for a prospective employee. They will be able to register using that email.</Card.Subtitle>
                </Row>
                <Row xs={2} md={7} lg={7}  className="justify-content-center">
                    <Form className="email_employee_invite">
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className="uvs-left"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Text className="register_employee_message">{message}</Form.Text>
                    </Form>
                </Row>
                <Row xs={2} md={7} lg={7} className="justify-content-center">
                    <Button className="invite_employees_bttn uvs-left" onClick={invite}>Invite</Button>
                </Row>
        </Card>
    );
}

export default EmployerInvitations;