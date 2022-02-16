import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './LearningModuleCard.css'
import { Card, Image, Button, Container, CardDeck } from 'react-bootstrap';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import axios from 'axios';

/**
 * Returns Panels of the Employees Cards 
 * @returns 
 */
const EmployeesCards = () => {
    const companyId = 100
    const [employees, setEmployees] = useState([])
    employees = ["John", "Sarah", "new guy"]

    // // Query for getting user's required learning modules
    // useEffect(() => {
    //     axios.get('http://localhost:3002/api/getQuery', 
    //         { params: { the_query: 'SELECT * FROM Employees JOIN AssignedEmployees ON Employees.ID = AssignedEmployees.LearningModID WHERE AssignedEmployees.UserID = ' + userId} 
    //         }).then((response) => {
    //             setEmployees(Object.values(response.data))
    //     });
    // }, [])

    /**
     * Create directory cards from modules
     * @param {modules} to create cards for
     * @param {max_length} to limit max card number created
     */
    function createEmployeeCards(modules, maxLength=5) {
        const objs = [];
        let size = 0
        for (let index in modules) {
            if (size == maxLength) { break; }
            module = modules[index]
            objs.push(<ModulePanel title={module.Title} link={module.ID} />)
            size += 1;
        }
        return objs;
    }

    return (
        <>
        <Container className=" EmployeesCards">                
            {createModuleCardHeader(Employees)}
        </Container>
        <CardDeck className="dashboard" style={{display: 'flex', flexDirection: 'row'}}>
            {createModuleCards(Employees, 5)}
        </CardDeck>
        <div className="d-grid gap-2">
        </div>
        </>
    );
}

export default EmployeesCards