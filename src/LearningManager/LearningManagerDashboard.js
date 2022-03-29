import React from 'react';
import './../Dashboard/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck } from 'react-bootstrap';
import MenuBar from '../MenuBar/MenuBar';               
import LearningManagerCards from './LearningManagerCards';
import WelcomePanel from '../Dashboard/WelcomePanel';
import LearningModuleAdder from './LearningManagerAdder';
import { useEffect, useState, Link} from "react";
import { useParams } from "react-router";
import Axios from 'axios';


/**
* Creates and holds all of the componets for the LearningManager Dashboard. 
* @return {LearningManagerDashboardPage}
*/
const LearningManagerDashboardPage = () => {
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [isLoading, setLoading] = useState(true)

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
          <WelcomePanel user={session} subtitle={'to the Learning Manager Page'}/>
          <LearningModuleAdder companyId={companyId}/>
        </CardDeck>
        <LearningManagerCards companyId={companyId}/>
        
    </>
  );
}
/*
<CardDeck className="LearningManagerDashTopPanel" style={{display: 'flex', flexDirection: 'row'}}>
          <HelloLearningManager></HelloLearningManager>
        </CardDeck>
        <LearningManagerCards></LearningManagerCards>
*/

export default LearningManagerDashboardPage;