import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'   
import { Card, CardDeck, Col } from 'react-bootstrap';
import { useEffect, useState} from "react";
import './EmployeeCard.css';
import axios from 'axios';
import EmployeeCard from './EmployeeCard'
import { Typography } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import env from "react-dotenv";

/**
 * Returns Panels of the Employees Cards 
 * @param {int} companyId
 * @param {bool} reload
 * @param {function} setReload
 */
const EmployeesCards = (props) => {
    const [employees, setEmployees] = useState([])
    const [assignedModulesCount, setAssignedModulesCount] = useState([])
    const [userCompletedModules, setUserCompletedModules] = useState([])
    const [isLoading, setLoading] = useState(true)

    // Set loading state for latter queries
    useEffect(() => {
        if (Number.isInteger(props.companyId)) {
            setLoading(false)
        }
    }, [props.companyId])

    // Get all of the employees that are employed at the company the user is an
    // admin of. 
    useEffect(() => {
        if(!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, 
                { params: { the_query: 'SELECT Users.username, Users.email, Users.userid as UserId, Users.active, AffiliatedUsers.CompanyID as CompanyId ' + 
                'FROM AffiliatedUsers ' + 
                    'JOIN Users ON AffiliatedUsers.UserID = Users.userid ' + 
                'WHERE AffiliatedUsers.CompanyID = ' + props.companyId + ' ' +
                'ORDER BY Users.email'} 
                }).then((response) => {
                    let employeeRows = Object.values(response.data);
                    setEmployees(employeeRows);
                    console.log("Got employees");
            });
        }
    }, [isLoading, props.reload])

    // Get each company's assigned modules
    useEffect(() => {
        if(!isLoading) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, 
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
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, 
                { params: { the_query: 'SELECT COUNT(CompletedModules.LearningModID) AS completedModules, AffiliatedUsers.UserId ' + 
                'FROM AffiliatedUsers ' + 
                    'JOIN CompletedModules ON AffiliatedUsers.UserID = CompletedModules.UserID ' + 
                    'JOIN CompanyLearningModules ON CompletedModules.LearningModID = CompanyLearningModules.LearningModID ' +
                'WHERE CompanyLearningModules.CompanyID = ' + props.companyId + ' ' +
                'GROUP BY AffiliatedUsers.UserId'} 
                }).then((response) => {
                    // console.log("Printing modules")
                    // console.log(response.data)
                    setUserCompletedModules(Object.values(response.data))
                    // console.log(userCompletedModules)
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
        // console.log(value)
        for (let index in array) {
            // console.log(array[index].UserId)
            if (array[index].UserId === value) {
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
     * @param {array} modules to create cards for
     * @param {int} max_length to limit max card number created
     */
    function createEmployeeCards(employees, maxLength=-1) {
        const objs = [];
        let size = 0
        for (let index in employees) {
            if (size === maxLength) { break; } 
            let employee = employees[index]
            let completedModulesNum = 0
            let completedMods = findValueInArrayOfDict(userCompletedModules, employee.UserId)
            if (completedMods) {
                completedModulesNum = completedMods
            }
            const progress = String(completedModulesNum) +'/' + String(totalCompanyRequiredModules)
            const activated = employee.active ? 'Active' : 'Inactive'
            objs.push(
                    <EmployeeCard
                        key={index}
                        name={employee.username}
                        email={employee.email}
                        progress={progress}
                        activated={activated}
                        lastActivity={employee.lastActivity}
                        userId={employee.UserId}
                        companyId={employee.CompanyId}
                        reload={props.reload}
                        setReload={props.setReload}
                    />
            )
            size += 1;
        }
        return objs;
    }

    const totalCompanyRequiredModules = assignedModulesCount.map((assignedModulesCount) => {
        return assignedModulesCount.totalAssignedModules
    })

    const rows = [];

    return (
        <>
        
         <Typography variant="h5" className="uvs-left">Employees</Typography>


        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell align="right">User Email</TableCell>
              <TableCell align="right">Activated</TableCell>
              <TableCell align="right">Last Activity</TableCell>
              <TableCell align="right">User Progress</TableCell>
            <TableCell align="right">Remove User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {createEmployeeCards(employees)}
          </TableBody>
        </Table>
      </TableContainer>


        </>
    );
}


  



export default EmployeesCards