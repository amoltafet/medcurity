import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Image, Button, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import EmployeeJoinRequestsCard from './EmployeeJoinRequestCard';

/**
 * Returns Panels of the Employees Cards 
 * @returns 
 */
const EmployerJoinRequests = () => {
    const userId = 100
    // const [employees, setEmployees] = useState([])
    let requestees = [
        {Name:"Jill", Email:"j@gmail.com", Progress:1},
        {Name:"Jen", Email:"ja@gmail.com", Progress:1},
        {Name:"Joan", Email:"je@gmail.com", Progress:21}
    ]

    // Get all of the employees that are employed at the company the user is an
    // admin of. Then selects their email, name, completed modules
    // useEffect(() => {
    //     axios.get('http://localhost:3002/api/getQuery', 
    //         { params: { the_query: 'SELECT Users.username, Users.email, Users ' + 
    //         'FROM AffiliatedUsers ' + 
    //             'JOIN Users ON AffiliatedUsers.UserID = Users.ID ' + 
    //             'JOIN CompanyAdmins ON CompanyAdmins.CompanyID = AffiliatedUsers.CompanyID ' +
    //             'JOIN UserStatistics ON UserStatistics.UserId = Users.ID ' +
    //         'WHERE CompanyAdmins.UserID = ' + userId } 
    //         }).then((response) => {
    //             setEmployees(Object.values(response.data))
    //     });
    // }, [])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createRequestCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<EmployeeJoinRequestsCard email={module.Email} name={module.Name} />)
            size += 1;
        }
        return objs;
    }

    function determineIfUserRequests(requestees) {
        const objs = [];
        if (requestees.length != 0) {
            objs.push(
                <>
                <Card className="EmployeeCardHeader uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                    <Col sm>
                        <div className="EmployeeCardValues">User Email</div>
                    </Col>
                    <Col sm>
                        <div className="EmployeeCardValues">User Name</div>
                    </Col>
                    <Col sm>
                        <div className="EmployeeCardValues">Accept User</div>
                    </Col>
                    <Col sm>
                        <div className="EmployeeCardValues">Reject User</div>
                    </Col>
                </Card>
            
                <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                    {createRequestCards(requestees)}
                </CardDeck>
                </>
            );
        }
        else {
            objs.push(<h4>You have no current requests to join</h4>);
        }
        return objs;
    }

    return (
        <>
        <Container className="EmployerJoinRequests uvs-left uvs-right">          
            <h2>Requests to Join Your Organization</h2>      
            {determineIfUserRequests(requestees)}
        </Container>

        </>
    );
}

export default EmployerJoinRequests