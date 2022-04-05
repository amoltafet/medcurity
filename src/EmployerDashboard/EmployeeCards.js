import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState} from "react";
import axios from 'axios';
import EmployeeCard from './EmployeeCard'

/**
 * Returns Panels of the Employees Cards 
 * @returns 
 */
const EmployeesCards = (props) => {
    const userId = String(props.user.userid)
    const [employees, setEmployees] = useState([])
    const [assignedModulesCount, setAssignedModulesCount] = useState([])
    const [userCompletedModules, setUserCompletedModules] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (Number.isInteger(props.companyId)) {
            setLoading(false)
        }
    }, [props.companyId])

    // Get all of the employees that are employed at the company the user is an
    // admin of. Then selects their email, name
    useEffect(() => {
        if(!isLoading) {
            axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT Users.username, Users.email, Users.userid as UserId, Users.active, AffiliatedUsers.CompanyID as CompanyId ' + 
                'FROM AffiliatedUsers ' + 
                    'JOIN Users ON AffiliatedUsers.UserID = Users.userid ' + 
                'WHERE AffiliatedUsers.CompanyID = ' + props.companyId + ' ' +
                'ORDER BY Users.email'} 
                }).then((response) => {
                    setEmployees(Object.values(response.data))
                    console.log("Got employees")
            });
        }
    }, [isLoading, props.reload])

    // Get each companies assigned modules
    useEffect(() => {
        if(!isLoading) {
            axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT COUNT(CompanyLearningModules.LearningModID) as totalAssignedModules ' + 
                'FROM CompanyLearningModules ' + 
                'WHERE CompanyLearningModules.CompanyID = ' + props.companyId} 
                }).then((response) => {
                    setAssignedModulesCount(Object.values(response.data))
            });
        }
    }, [isLoading, props.reload])

    // Get a count of how many modules of the company are completed for
    // each user associated with the company
    // COUNT(CompletedModules.LearningModID), AffiliatedUsers.UserId
    useEffect(() => {
        if(!isLoading) {
            axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT COUNT(CompletedModules.LearningModID) AS completedModules, AffiliatedUsers.UserId ' + 
                'FROM AffiliatedUsers ' + 
                    'JOIN CompletedModules ON AffiliatedUsers.UserID = CompletedModules.UserID ' + 
                    'JOIN CompanyLearningModules ON CompletedModules.LearningModID = CompanyLearningModules.LearningModID ' +
                'WHERE CompanyLearningModules.CompanyID = ' + props.companyId + ' ' +
                'GROUP BY AffiliatedUsers.UserId'} 
                }).then((response) => {
                    console.log("Printing modules")
                    console.log(response.data)
                    setUserCompletedModules(Object.values(response.data))
                    console.log(userCompletedModules)
            });
        }
    }, [isLoading, props.reload])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createEmployeeCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size === maxLength) { break; }
            //TODO If find userid in userCompletedModules, then use their number of completed modules
            // Otherwise use 0
            module = modules[index]
            objs.push(<EmployeeCard email={module.email} name={module.username} 
                progress={'0/' + String(totalCompanyRequiredModules)} userId={module.UserId} 
                activeStatus={module.active} companyId={module.CompanyId} 
                setReload={props.setReload} />)
            size += 1;
        }
        return objs;
    }

    const totalCompanyRequiredModules = assignedModulesCount.map((assignedModulesCount) => {
        return assignedModulesCount.totalAssignedModules
    })

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