import React from 'react';
import './../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../MenuBar/MenuBar';               
import EmployeeCards from './EmployeeCards';
import WelcomePanel from './../Dashboard/WelcomePanel';
import EmployerInvitations from './EmployerInvitations';
import { useEffect, useState} from "react";
import Axios from 'axios';


/**
* Creates and holds all of the componets for the employer Dashboard. 
* @return {EmployerDashboardPage}
*/
const EmployerDashboardPage = () => {
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);

    // Resets reload after it has been triggered
    useEffect(() => {
        setReload(false)
    }, [reload]);

    useEffect(() => {
        Axios.get("http://localhost:3002/users/login").then((response) => {
          setSession(response.data.user[0])
        });
	}, []);

    useEffect(() => {
        if (session.userid != undefined) {
            setLoading(false)
        }
    }, [session])

    // Query for getting companyid of associated user
    useEffect(() => {
        if (!isLoading) {
            Axios.get('http://localhost:3002/api/getQuery', 
                { params: { the_query: 'SELECT CompanyAdmins.CompanyID ' +
                'FROM CompanyAdmins ' +
                'WHERE CompanyAdmins.UserID = ' + String(session.userid)} 
                }).then((response) => {
                    setCompanyId(Object.values(response.data)[0].CompanyID)
            });            
        }
    }, [isLoading])


    return (
    <>
        <MenuBar></MenuBar>
        <CardDeck className="dashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <WelcomePanel user={session} subtitle={'to the Administration Page'}/>
          <EmployerInvitations companyId={companyId} reload={reload} setReload={setReload} />
        </CardDeck>
        <EmployeeCards user={session} reload={reload} setReload={setReload} />
        
    </>
  );
}

export default EmployerDashboardPage;