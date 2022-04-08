import React from 'react';
import './LearningDirectoryPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import Axios from 'axios';
import { LearningDirectoryPageContent } from './LearningDirectoryPage';

const LearningDirectoryRequiredPage = () => {
    const [learningModules, setLearningModules] = useState([])
    Axios.defaults.withCredentials = true;
    const [session, setSession] = useState([]);
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

    // Query for getting user's required learning modules
    useEffect(() => {
        if (!isLoading) {
            Axios.get('http://localhost:3002/api/getAllUserRequiredModules', 
                { params: { userid: session.userid }
                }).then((response) => {
                    setLearningModules(Object.values(response.data))
            }).catch(error => console.error(`Error ${error}`));
        }
    }, [session.userid, isLoading])

    return(
        <LearningDirectoryPageContent directoryTitle="Required Modules Directory" modules={learningModules} />
    );

}

export default LearningDirectoryRequiredPage;