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
import axios from 'axios';


/**
* Creates and holds all of the componets for the LearningManager Dashboard. 
* @return {LearningManagerDashboardPage}
*/
const LearningManagerDashboardPage = () => {
    axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);

    // Resets reload after it has been triggered
    useEffect(() => {
        setReload(false)
    }, [reload]);

    useEffect(() => {
        axios.get("http://localhost:3002/users/login").then((response) => {
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
            axios.get('http://localhost:3002/api/getQuery', 
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
          <LearningModuleAdder companyId={companyId} reload={reload} setReload={setReload} />
        </CardDeck>
        <LearningManagerCards companyId={companyId} reload={reload} setReload={setReload} />
        
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