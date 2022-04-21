import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Image, Button, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import axios from 'axios';
import EmployerCard from './EmployerCard'

/**
 * Returns Panels of the Employers Cards 
 * @returns 
 */
const EmployersCards = () => {
    const [employers, setEmployers] = useState("")
    const [companies, setCompanies] = useState("")
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `SELECT * FROM CompanyAdmins LEFT JOIN Users ON CompanyAdmins.UserID = Users.userid` } }).then((response) => {
            setEmployers(response.data)
            // console.log("We added", response.data)
            }).catch(error => console.error(`Error ${error}`));
        },[])

    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', { params: { the_query: `SELECT * FROM Companies ` } }).then((response) => {
            setCompanies(response.data)
            // console.log("Companies:", companies)
            }).catch(error => console.error(`Error ${error}`));
        },[])

    // Get all of the Employers that are employed at the company the user is an
    // admin of. Then selects their email, name, completed modules
    // useEffect(() => {
    //     axios.get('http://localhost:3002/api/getQuery', 
    //         { params: { the_query: 'SELECT Users.username, Users.email, Users.userid as UserId, CompanyAdmins.CompanyID as CompanyId ' + 
    //         'FROM AffiliatedUsers ' + 
    //             'JOIN Users ON AffiliatedUsers.UserID = Users.ID ' + 
    //             'JOIN CompanyAdmins ON CompanyAdmins.CompanyID = AffiliatedUsers.CompanyID ' +
    //             'JOIN UserStatistics ON UserStatistics.UserId = Users.ID ' +
    //         'WHERE CompanyAdmins.UserID = ' + userId +
    //         'ASCENDING...'} 
    //         }).then((response) => {
    //             setEmployers(Object.values(response.data))
    //     });
    // }, [])



    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createEmployerCards(maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in employers) {
            if (size == maxLength) { break; }
            var employer = employers[index]
            objs.push(<EmployerCard companyNames={companies} email={employer.email} name={employer.username} company={employer.CompanyID} userId={employer.UserID} companyId={employer.CompanyId} status={employer.active} />)
            size += 1;
        }
        return objs;
    }

    return (
        <>
        <Container className="Employer-container uvs-right text-center">
            <h2 className="employer-header_admin_dash">Employers</h2>      
            <Card className="uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col sm>
                    <div className="EmployerCardValues"><b>Employer Email</b></div>
                </Col>
                <Col sm>
                    <div className="EmployerCardValues"><b>Employer Username</b></div>
                </Col>
                <Col sm>
                    <div className="EmployerCardValues"><b>Employer Company</b></div>
                </Col>
                <Col sm>
                    <div className="EmployerCardValues"><b>Employer Status</b></div>
                </Col>
                <Col sm>
                    <div className="EmployerCardValues"><b>Remove Employer</b></div>
                </Col>
            </Card>
        
            <CardDeck style={{display: 'flex', flexDirection: 'column'}}>
                {createEmployerCards(employers)}
            </CardDeck>

        </Container>
        </>
    );
}

export default EmployersCards