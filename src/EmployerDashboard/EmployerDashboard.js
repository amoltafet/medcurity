import React from 'react';
import './../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {CardDeck} from 'react-bootstrap'
import MenuBar from '../MenuBar/MenuBar';               
import EmployeeCards from './EmployeeCards';
import EmployerJoinRequests from './EmployerJoinRequests'


/**
* Creates and holds all of the componets for the Dashboard. 
* @return {EmployerDashboardPage}
*/
const EmployerDashboardPage = () => {
    return (
    <>
        <MenuBar></MenuBar>
        <EmployerJoinRequests />
        <EmployeeCards />
        
    </>
  );
}
/*
<CardDeck className="employeeDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloEmployer></HelloEmployer>
        </CardDeck>
        <EmployeeCards></EmployeeCards>
*/

export default EmployerDashboardPage;