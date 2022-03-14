import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Image, Button, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import axios from 'axios';
import EmployeeCard from './EmployeeCard'

/**
 * Returns Panels of the Employees Cards 
 * @returns 
 */
const EmployeesCards = (props) => {
    const userId = String(props.user.userid)
    // Test account details
    // id 159
    // email bobbytables@gmail.com
    // 1234
    const [employees, setEmployees] = useState([])
    const [assignedModulesCount, setAssignedModulesCount] = useState([])
    const [userCompletedModules, setUserCompletedModules] = useState([])
    // let employees = [
    //     {Name:"John", Email:"j@gmail.com", Progress:1},
    //     {Name:"Jack", Email:"ja@gmail.com", Progress:1},
    //     {Name:"Jen", Email:"je@gmail.com", Progress:21}
    // ]

    // Get all of the employees that are employed at the company the user is an
    // admin of. Then selects their email, name
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT Users.username, Users.email, Users.userid as UserId, Users.active, CompanyAdmins.CompanyID as CompanyId ' + 
            'FROM AffiliatedUsers ' + 
                'JOIN Users ON AffiliatedUsers.UserID = Users.userid ' + 
                'JOIN CompanyAdmins ON CompanyAdmins.CompanyID = AffiliatedUsers.CompanyID ' +
            'WHERE CompanyAdmins.UserID = ' + userId + ' ' +
            'ORDER BY Users.email'} 
            }).then((response) => {
                setEmployees(Object.values(response.data))
        });
    }, [])

    // Get each companies assigned modules
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT COUNT(CompanyLearningModules.LearningModID) as totalAssignedModules ' + 
            'FROM CompanyLearningModules ' + 
                'JOIN CompanyAdmins ON CompanyAdmins.CompanyID = CompanyLearningModules.CompanyID ' +
            'WHERE CompanyAdmins.UserID = ' + userId} 
            }).then((response) => {
                setAssignedModulesCount(Object.values(response.data))
        });
    }, [])

    // Get a count of how many modules each user associated with the company
    // of the current user has completed
    useEffect(() => {
        axios.get('http://localhost:3002/api/getQuery', 
            { params: { the_query: 'SELECT COUNT(CompletedModules.LearningModID), AffiliatedUsers.UserId ' + 
            'FROM AffiliatedUsers ' + 
                'JOIN CompletedModules ON AffiliatedUsers.UserID = CompletedModules.UserID ' + 
                'JOIN CompanyAdmins ON CompanyAdmins.CompanyID = AffiliatedUsers.CompanyID ' +
                'JOIN CompanyLearningModules ON CompanyAdmins.CompanyID = CompanyLearningModules.CompanyID ' +
            'WHERE CompanyAdmins.UserID = ' + userId + ' ' +
            'GROUP BY AffiliatedUsers.UserId'} 
            }).then((response) => {
                setUserCompletedModules(Object.values(response.data))
        });
    }, [])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createEmployeeCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<EmployeeCard email={module.email} name={module.username} progress={'0/' + String(totalCompanyRequiredModules)} userId={module.UserId} activeStatus={module.active} companyId={module.CompanyId} />)
            size += 1;
        }
        return objs;
    }

    const totalCompanyRequiredModules = assignedModulesCount.map((assignedModulesCount) => {
        return assignedModulesCount.totalAssignedModules
    })

    console.log(employees);
    console.log(assignedModulesCount);
    console.log(userCompletedModules);

    return (
        <>
        <Container className="EmployerJoinRequests uvs-right">
            <h2>Employees</h2>      
            <Card className="EmployeeCardHeader uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col sm>
                    <div className="EmployeeCardValues">User Email</div>
                </Col>
                <Col sm>
                    <div className="EmployeeCardValues">User Name</div>
                </Col>
                <Col sm>
                    <div className="EmployeeCardValues">User is Active</div>
                </Col>
                <Col sm>
                    <div className="EmployeeCardValues">User Progress</div>
                </Col>
                <Col sm>
                    <div className="RemoveButton"></div>
                </Col>
            </Card>
        
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                {createEmployeeCards(employees)}
            </CardDeck>

        </Container>
        </>
    );
}

export default EmployeesCards