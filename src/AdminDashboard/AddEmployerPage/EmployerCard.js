import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import './EmployerCard.css';
import { useState} from "react";
import axios from 'axios';
// import env from "react-dotenv";

/**
 * Panel for Module cards
 * @param {} props 
 * @returns 
 */
const EmployerCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
 

    /**
     * Removes a user from the selected company
     * @param {int} userId 
     */
    function removeEmployer() {
        // console.log("Removing Employer from company");
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `DELETE FROM CompanyAdmins WHERE UserID = '${props.userId}'` } }).then((response) => {
        }).catch(error => console.error(`Error ${error}`));
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `DELETE FROM Users WHERE userid = '${props.userId}'` } }).then((response) => {
        }).catch(error => console.error(`Error ${error}`));

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `DELETE FROM AffiliatedUsers WHERE UserID = '${props.userId}'` } }).then((response) => {
        }).catch(error => console.error(`Error ${error}`));

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `DELETE FROM AssignedLearningModules WHERE UserID = '${props.userId}'` } }).then((response) => {
        }).catch(error => console.error(`Error ${error}`));

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: `DELETE FROM CompletedModules WHERE UserID = '${props.userId}'` } }).then((response) => {
        }).catch(error => console.error(`Error ${error}`));
    }

    // function removeModule() {
    //     // console.log("Removing LearningModule from company");
    //     axios.get('${process.env.REACT_APP_BASE_URL}/api/getQuery', { params: { the_query: `DELETE FROM Questions WHERE module = '${props.moduleId}'` } }).then((response) => {
    //         // console.log("Removing Questions for", props.moduleId)
    //         }).catch(error => console.error(`Error ${error}`));
        
    //     axios.get('${process.env.REACT_APP_BASE_URL}/api/getQuery', { params: { the_query: `DELETE FROM LearningModules WHERE ID = '${props.moduleId}'` } }).then((response) => {
    //         // console.log("Removing Questions for", props.moduleId)
    //         }).catch(error => console.error(`Error ${error}`));
    // }

    var userStatus;
    if(props.status === 0) {
        userStatus = "Inactive"
    }
    else if (props.status === 1) {
        userStatus = "Active"
    }
    var companyName;
    for(var i = 0; i < props.companyNames.length; i++) {
        var company = props.companyNames[i]
        if(company.companyid === props.company) {
            companyName = company.name
        }
    }

    return (
        <>
        <Card className="EmployerCard uvs-right uvs-left" style={{ flexDirection: 'row' }}>
            <Col xs={2} md={2} lg={3}>
                <div className="EmployerCardValues_email">{props.email}</div>
            </Col>
            <Col  xs={3} md={2} lg={3}>
                <div className="EmployerCardValues_username">{props.name}</div>
            </Col>
            <Col  xs={2} md={2} lg={2}>
                <div className="EmployerCardValues_company">{companyName}</div>
            </Col>
            <Col  xs={2} md={2} lg={2}>
                <div className="EmployerCardValues">{userStatus}</div>
            </Col>
            <Col  xs={2} md={2} lg={2}>
                <OverlayTrigger trigger="click" placement="left" 
                overlay={
                    <Popover id="popover-basic" className="EmployerPopup">
                        <div className="EmployerCardValues">Please confirm that you want to delete the user '{props.name}': </div> 
                        <Button className="EmployerInRowButton uvs-right" 
                            variant="success" 
                            onClick={() => removeEmployer()}
                            href='/admin-dash'
                            > 
                            Confirm 
                        </Button>
                    </Popover>
                }>
        
                    <Button className="EmployerInRowButton_admin_remove_user uvs-right" 
                    size="sm" 
                    variant="danger"> 
                    Remove User </Button>
                </OverlayTrigger>
            </Col>
        </Card>

        </>
    );
}

export default EmployerCard;