import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, Container, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState} from "react";
import './EmployeeCard.css';
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
                    // let completedModules = []
                    // for (let record in Object.values(response.data)) {

                    //     completedModules.push({'UserId': record[0].UserId})
                    // }
                    // console.log(completedModules)
                    setUserCompletedModules(Object.values(response.data))
                    console.log(userCompletedModules)
            });
        }
    }, [isLoading, props.reload])
    

    /**
     * This function finds a record in an array of dictionaries
     * @param {list of dict} array 
     * @param {str} key 
     * @param {obj} value 
     * @returns 
     */
    function findValueInArrayOfDict(array, value) {
        console.log(value)
        for (let index in array) {
            console.log(array[index].UserId)
            if (array[index].UserId == value) {
                return array[index].completedModules
            }
        }
        return false
    }

    /**
     * Create directory cards from modules. If the maxlength is reached, stops.
     * Calculates the completed modules number for every user by searching for
     * it in userCompletedModules. If this fails returns 0. Then makes pushes a card
     * on.
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createEmployeeCards(modules, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size === maxLength) { break; } 
            module = modules[index]
            let completedModulesNum = 0
            let completedMods = findValueInArrayOfDict(userCompletedModules, module.UserId)
            if (completedMods) {
                completedModulesNum = completedMods
            }
            objs.push(<EmployeeCard email={module.email} name={module.username} 
                progress={String(completedModulesNum) +'/' + String(totalCompanyRequiredModules)} userId={module.UserId} 
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
        <Card className="EmployerJoinRequests uvs-right">
            <Card.Title className="employee_remove_card_header"><b>Employees</b></Card.Title>    
            <CardDeck style={{display: 'flex', flexDirection: 'column'}}>  
            <Card className="EmployeeCardHeader justify-content-center uvs-right uvs-left" style={{display: 'flex', flexDirection: 'row' }}>
                <Col xs={2} md={2} lg={2}>
                    <div className="employee_remove_email text-center"><b>User Email</b></div>
                </Col>
                <Col xs={2} md={2} lg={2}>
                    <div className="employee_remove_username text-center"><b>User Name</b></div>
                </Col>
                <Col xs={3} md={2} lg={2}>
                    <div className="employee_remove_active text-center"><b>User is Active</b></div>
                </Col>
                <Col xs={3} md={2} lg={2}>
                    <div className="employee_remove_progress text-center"><b>User Progress</b></div>
                </Col>
                <Col xs={2} md={2} lg={2}>
                    <div className="employee_remove_bttn text-center"><b>Remove User</b></div>
                </Col>
            </Card>
            </CardDeck>
        
            <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'column'}}>
                {createEmployeeCards(employees)}
            </CardDeck>

        </Card>
        </>
    );
}

export default EmployeesCards